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

  const fetchData = async () => {
    try {
      // ❌ if no user → redirect
      if (!user || !user.token) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      // ✅ parallel API calls (fast + safe)
      const [bookRes, userRes, borrowRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/books", { headers }),
        fetch("http://127.0.0.1:5000/users", { headers }),
        fetch("http://127.0.0.1:5000/borrows", { headers }),
      ]);

      // ❌ handle API errors
      if (!bookRes.ok || !userRes.ok || !borrowRes.ok) {
        throw new Error("API Error - Unauthorized or Server Down");
      }

      const bookData = await bookRes.json();
      const userData = await userRes.json();
      const borrowData = await borrowRes.json();

      setBooks(Array.isArray(bookData) ? bookData : []);
      setUsers(Array.isArray(userData) ? userData : []);
      setBorrows(Array.isArray(borrowData) ? borrowData : []);
    } catch (error) {
      console.error("DASHBOARD ERROR:", error);
      alert("Server error or unauthorized access");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Card = ({ title, value, color }) => (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );

  // ✅ LOADING STATE
  if (loading) {
    return (
      <AdminLayout>
        <p className="text-white">Loading dashboard...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Books" value={books.length} color="text-blue-400" />
        <Card title="Users" value={users.length} color="text-green-400" />
        <Card title="Borrows" value={borrows.length} color="text-purple-400" />
      </div>

      {/* RECENT BORROWS */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">📖 Recent Borrows</h2>

        <div className="grid gap-3">
          {borrows.length === 0 ? (
            <p className="text-gray-400">No borrow activity</p>
          ) : (
            borrows.slice(0, 5).map((b) => (
              <div
                key={b.id}
                className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"
              >
                <div>
                  <p>Book ID: {b.book_id}</p>
                  <p className="text-gray-400 text-sm">User: {b.user}</p>
                </div>
                <span className="text-yellow-400">Fine: {b.fine}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
