import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "library.db")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# ensure table exists (safe check)
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    username TEXT,
    password TEXT,
    role TEXT
)
""")

cursor.execute("SELECT id, username, password, role FROM users")
rows = cursor.fetchall()

if len(rows) == 0:
    print("❌ No users found in database")
else:
    for row in rows:
        print(row)

conn.close()