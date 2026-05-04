import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      if (!user?.token) {
        navigate("/login");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };

      const [bookRes, userRes, borrowRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/books", { headers }),
        fetch("http://127.0.0.1:5000/users", { headers }),
        fetch("http://127.0.0.1:5000/borrows", { headers }).catch(() => null),
      ]);

      const booksData = await bookRes.json();
      const usersData = await userRes.json();

      setBooks(Array.isArray(booksData) ? booksData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);

      if (borrowRes && borrowRes.ok) {
        const borrowsData = await borrowRes.json();
        setBorrows(Array.isArray(borrowsData) ? borrowsData : []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE BOOK =================
  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    await fetch(`http://127.0.0.1:5000/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    fetchData();
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    fetchData();
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-white">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        📊 Admin Dashboard
      </h1>

      {/* ================= BOOKS ================= */}
      <h2 className="text-xl text-blue-300 mb-3">📚 Books</h2>

      <div className="grid gap-3">
        {books.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"
          >
            <div>
              <p className="text-white font-semibold">{b.title}</p>
              <p className="text-gray-400 text-sm">{b.author}</p>
            </div>

            <button
              onClick={() => deleteBook(b.id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= USERS ================= */}
      <h2 className="text-xl text-green-300 mt-10 mb-3">👥 Users</h2>

      <div className="grid gap-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"
          >
            <div>
              <p className="text-white">{u.name}</p>
              <p className="text-gray-400 text-sm">{u.email}</p>
            </div>

            <button
              onClick={() => deleteUser(u.id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ================= BORROWS ================= */}
      <h2 className="text-xl text-purple-300 mt-10 mb-3">📖 Recent Borrows</h2>

      <div className="grid gap-3">
        {borrows.slice(0, 5).map((b, i) => (
          <div
            key={i}
            className="p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            Book ID: {b.book_id} | User: {b.user}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
