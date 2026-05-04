# 📚 Library Management System

A modern **Full-Stack Library Management System** built using:

- ⚛️ React.js (Frontend)
- 🎨 Tailwind CSS (UI Design)
- 🐍 Python Flask (Backend)
- 🗄 SQLite (Database)

This system allows users to browse and read books online, while admins can manage books, users, and library data.

---

## 🚀 Features

### 👤 User Side

- 🔍 Search books
- 📖 Read PDF books online
- 🖼 View book covers
- ⚡ Fast and responsive UI

### 🛠 Admin Side

- ➕ Add Books / Magazines / Journals
- 🗑 Delete Books
- 👥 Manage Users (Delete users)
- 🔐 Secure login system (JWT Authentication)

---

## 📂 Project Structure

```
library-management-system/
│
├── backend/        # Flask API
├── frontend/       # React App
├── uploads/        # Uploaded files (ignored in git)
└── library.db      # Database (ignored in git)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

---

### 2️⃣ Backend Setup (Flask)

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

👉 Backend will run on:
http://127.0.0.1:5000

---

### 3️⃣ Frontend Setup (React)

```
cd frontend/main
npm install
npm start
```

👉 Frontend will run on:
http://localhost:3000

---

## 🛡 Security

- Password hashing using bcrypt
- JWT-based authentication
- Protected admin routes

---

## 📌 Future Improvements

- 📱 Mobile responsive UI improvements
- 📊 Dashboard analytics
- 📚 Borrow system with due dates
- 🌐 Deployment (Netlify + Render)

---

## 👨‍💻 Author

**Muhammad Moosa**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
