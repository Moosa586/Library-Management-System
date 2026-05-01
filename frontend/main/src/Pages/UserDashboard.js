import React, { useEffect, useState } from "react";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [query, setQuery] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH BOOKS =================
  const fetchBooks = async (search = "") => {
    const url = search
      ? `http://127.0.0.1:5000/search?q=${search}`
      : "http://127.0.0.1:5000/books";

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    const data = await res.json();
    setBooks(Array.isArray(data) ? data : []);
  };

  // ================= FETCH BORROWS =================
  const fetchBorrows = async () => {
    const res = await fetch("http://127.0.0.1:5000/borrows", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    const data = await res.json();
    setBorrows(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrows();
  }, []);

  // ================= BORROW BOOK =================
  const borrowBook = async (id) => {
    await fetch(`http://127.0.0.1:5000/borrow/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setNotifications((prev) => [...prev, "📚 Book borrowed successfully"]);
    fetchBorrows();
  };

  // ================= RETURN BOOK =================
  const returnBook = async (id) => {
    await fetch(`http://127.0.0.1:5000/return/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setNotifications((prev) => [...prev, "✅ Book returned successfully"]);
    fetchBorrows();
  };

  // ================= DAYS LEFT =================
  const getDaysLeft = (due) => {
    const diff = new Date(due) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // ================= FINE =================
  const getFine = (due) => {
    const days = getDaysLeft(due);
    return days < 0 ? Math.abs(days) * 10 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center bg-gray-900 p-5 rounded-2xl mb-6">
        <div>
          <h1 className="text-2xl font-bold">📚 Library Dashboard</h1>
          <p className="text-gray-400">
            Welcome, <span className="text-blue-400">{user?.username}</span>
          </p>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 mb-6"
        placeholder="Search books..."
        onChange={(e) => {
          setQuery(e.target.value);
          fetchBooks(e.target.value);
        }}
      />

      {/* ================= BOOKS ================= */}
      <h2 className="text-xl font-bold mb-3">📖 Available Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {books.length === 0 ? (
          <p className="text-gray-400">No books available</p>
        ) : (
          books.map((b) => (
            <div key={b.id} className="bg-gray-900 p-4 rounded-xl">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-gray-400">{b.author}</p>

              <p className="text-sm text-gray-500 mt-1">
                📦 Qty: {b.quantity}
              </p>

              <button
                onClick={() => borrowBook(b.id)}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
              >
                Borrow
              </button>
            </div>
          ))
        )}
      </div>

      {/* ================= BORROWED BOOKS ================= */}
      <h2 className="text-xl font-bold mb-3">📘 My Borrowed Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {borrows.length === 0 ? (
          <p className="text-gray-400">No borrowed books yet</p>
        ) : (
          borrows.map((b) => {
            const daysLeft = getDaysLeft(b.due_date);
            const fine = getFine(b.due_date);

            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl ${
                  daysLeft < 0 ? "bg-red-900" : "bg-gray-900"
                }`}
              >
                <p>📖 Book ID: {b.book_id}</p>
                <p>📅 Due: {b.due_date}</p>

                <p
                  className={
                    daysLeft < 0 ? "text-red-300" : "text-green-400"
                  }
                >
                  ⏰ {daysLeft >= 0
                    ? `${daysLeft} days left`
                    : `${Math.abs(daysLeft)} days overdue`}
                </p>

                <p className="text-yellow-400">💸 Fine: Rs {fine}</p>

                <p className="text-gray-400">Status: {b.status}</p>

                {b.status !== "returned" && (
                  <button
                    onClick={() => returnBook(b.id)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                  >
                    Return Book
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-xl shadow-lg w-64">
          <h3 className="font-bold mb-2">🔔 Alerts</h3>
          {notifications.slice(-3).map((n, i) => (
            <p key={i} className="text-sm text-gray-300">
              {n}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;