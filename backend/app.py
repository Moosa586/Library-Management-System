from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import jwt
import bcrypt
from functools import wraps
from datetime import datetime, timedelta, timezone
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["SECRET_KEY"] = "library_system_2026_secret"

# ================= CORS =================
CORS(app, resources={r"/*": {"origins": "*"}})

# ================= ROOT ROUTE FIX =================
@app.route("/")
def home():
    return {
        "status": "success",
        "message": "🔥 moosa backend chal raha hai ok"
    }

# ================= UPLOAD FOLDER =================
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "library.db")


# ================= DB =================
def connect_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user'
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            category TEXT,
            image TEXT,
            file TEXT
        )
    """)

    conn.commit()
    conn.close()


init_db()


# ================= AUTH =================
def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization")
        if not auth:
            return jsonify({"error": "Token missing"}), 401

        try:
            token = auth.split(" ")[1]
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


# ================= REGISTER =================
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not all([name, email, username, password]):
        return jsonify({"error": "Missing fields"}), 400

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO users (name, email, username, password)
            VALUES (?, ?, ?, ?)
        """, (name, email, username, hashed))

        conn.commit()
        return jsonify({"message": "User registered"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 409
    finally:
        conn.close()


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    # ADMIN LOGIN
    if username == "admin" and password == "admin123":
        token = jwt.encode({
            "username": "admin",
            "role": "admin",
            "exp": datetime.now(timezone.utc) + timedelta(hours=5)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"token": token, "role": "admin"})

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode(), user["password"].encode()):
        token = jwt.encode({
            "username": user["username"],
            "role": user["role"],
            "exp": datetime.now(timezone.utc) + timedelta(hours=5)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"token": token, "role": user["role"]})

    return jsonify({"error": "Invalid credentials"}), 401


# ================= ADD BOOK (FIXED) =================
@app.route("/add-book", methods=["POST"])
@token_required
@admin_only
def add_book():
    try:
        title = request.form.get("title")
        author = request.form.get("author")
        category = request.form.get("category")

        file = request.files.get("file")
        image = request.files.get("image")

        file_name = None
        image_name = None

        if file:
            file_name = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], file_name))

        if image:
            image_name = secure_filename(image.filename)
            image.save(os.path.join(app.config["UPLOAD_FOLDER"], image_name))

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO books (title, author, category, image, file)
            VALUES (?, ?, ?, ?, ?)
        """, (title, author, category, image_name, file_name))

        conn.commit()
        conn.close()

        return jsonify({"message": "Book added successfully"})

    except Exception as e:
        print("ADD BOOK ERROR:", e)
        return jsonify({"error": "Server error"}), 500


# ================= BOOKS =================
@app.route("/books")
def books():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM books")
    data = cursor.fetchall()

    conn.close()
    return jsonify([dict(b) for b in data])


# ================= DELETE BOOK =================
@app.route("/books/<int:book_id>", methods=["DELETE"])
@token_required
@admin_only
def delete_book(book_id):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM books WHERE id=?", (book_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Book deleted"})


# ================= DELETE USER =================
@app.route("/users/<int:user_id>", methods=["DELETE"])
@token_required
@admin_only
def delete_user(user_id):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "User deleted"})


# ================= USERS =================
@app.route("/users")
@token_required
@admin_only
def users():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email, username, role FROM users")
    data = cursor.fetchall()

    conn.close()
    return jsonify([dict(u) for u in data])


# ================= FILES =================
@app.route("/uploads/<filename>")
def uploads(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# ================= RUN =================
if __name__ == "__main__":
    print("🔥 Library System Running...")
    app.run(debug=True)