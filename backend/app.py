from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import jwt
import bcrypt
from functools import wraps
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.config["SECRET_KEY"] = "my_super_secure_library_system_2026_key_12345"

# ✅ FIX: CORS full allow (frontend errors fix)
CORS(app, resources={r"/*": {"origins": "*"}})

# ================= DB =================
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "library.db")


def connect_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ================= INIT DB =================
def init_db():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            username TEXT UNIQUE,
            password BLOB,
            role TEXT DEFAULT 'user'
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            quantity INTEGER
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS borrow_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            book_id INTEGER,
            status TEXT DEFAULT 'pending',
            request_date TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS borrows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            book_id INTEGER,
            borrow_date TEXT,
            due_date TEXT,
            return_date TEXT,
            status TEXT DEFAULT 'borrowed',
            fine INTEGER DEFAULT 0
        )
    """)

    conn.commit()
    conn.close()


init_db()


# ================= AUTH =================
def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token missing"}), 401

        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user = data
        except:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return wrapper


def admin_only(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if request.user.get("role") != "admin":
            return jsonify({"error": "Admin only"}), 403
        return f(*args, **kwargs)

    return wrapper


# ================= HOME =================
@app.route("/")
def home():
    return jsonify({"message": "Library API Running 🚀"})


# ================= REGISTER =================
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO users (name, email, username, password)
            VALUES (?, ?, ?, ?)
        """, (data["name"], data["email"], data["username"], hashed))

        conn.commit()
        return jsonify({"message": "User registered"})
    except:
        return jsonify({"error": "Username already exists"})
    finally:
        conn.close()


# ================= LOGIN (FIXED + CLEAN) =================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    # ---------- ADMIN ----------
    if username == "admin" and password == "admin123":
        token = jwt.encode({
            "username": "admin",
            "role": "admin",
            "exp": datetime.now(timezone.utc) + timedelta(hours=5)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({
            "token": token,
            "role": "admin",
            "username": "admin"
        })

    # ---------- USER ----------
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode(), user["password"]):
        token = jwt.encode({
            "username": user["username"],
            "role": user["role"],
            "exp": datetime.now(timezone.utc) + timedelta(hours=5)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({
            "token": token,
            "role": user["role"],
            "username": user["username"]
        })

    return jsonify({"error": "Invalid username or password"}), 401


# ================= BOOKS =================
@app.route("/books")
@token_required
def books():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM books")
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(b) for b in data])


# ================= BORROW REQUEST =================
@app.route("/request-borrow/<int:book_id>", methods=["POST"])
@token_required
def request_borrow(book_id):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO borrow_requests (user, book_id, request_date)
        VALUES (?, ?, ?)
    """, (request.user["username"], book_id, str(datetime.now().date())))

    conn.commit()
    conn.close()

    return jsonify({"message": "Borrow request sent"})


# ================= APPROVE REQUEST =================
@app.route("/approve/<int:req_id>", methods=["POST"])
@token_required
@admin_only
def approve(req_id):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM borrow_requests WHERE id=?", (req_id,))
    req = cursor.fetchone()

    if not req:
        return jsonify({"error": "Request not found"}), 400

    borrow_date = datetime.now().date()
    due_date = borrow_date + timedelta(days=7)

    cursor.execute("""
        INSERT INTO borrows (user, book_id, borrow_date, due_date)
        VALUES (?, ?, ?, ?)
    """, (req["user"], req["book_id"], str(borrow_date), str(due_date)))

    cursor.execute("UPDATE borrow_requests SET status='approved' WHERE id=?", (req_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Request approved"})


# ================= REJECT REQUEST =================
@app.route("/reject/<int:req_id>", methods=["POST"])
@token_required
@admin_only
def reject(req_id):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("UPDATE borrow_requests SET status='rejected' WHERE id=?", (req_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Request rejected"})


# ================= BORROWS =================
@app.route("/borrows")
@token_required
def borrows():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM borrows")
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(b) for b in data])


# ================= RETURN BOOK =================
@app.route("/return/<int:borrow_id>", methods=["POST"])
@token_required
def return_book(borrow_id):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT due_date FROM borrows WHERE id=?", (borrow_id,))
    row = cursor.fetchone()

    if not row:
        return jsonify({"error": "Invalid ID"}), 400

    due_date = datetime.strptime(row["due_date"], "%Y-%m-%d").date()
    today = datetime.now().date()

    fine = 0
    if today > due_date:
        fine = (today - due_date).days * 10

    cursor.execute("""
        UPDATE borrows
        SET status='returned', return_date=?, fine=?
        WHERE id=?
    """, (str(today), fine, borrow_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Returned", "fine": fine})


# ================= STATS (DASHBOARD) =================
@app.route("/stats")
@token_required
@admin_only
def stats():

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM books")
    books = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM users")
    users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM borrows WHERE status='borrowed'")
    active = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(fine) FROM borrows")
    fine = cursor.fetchone()[0] or 0

    conn.close()

    return jsonify({
        "books": books,
        "users": users,
        "active_borrows": active,
        "total_fine": fine
    })


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)