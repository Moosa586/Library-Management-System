import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";

function BookList() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBooks = async () => {
    const res = await fetch("http://127.0.0.1:5000/books", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setBooks(await res.json());
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const borrow = async (id) => {
    await fetch(`http://127.0.0.1:5000/borrow/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    alert("Book Borrowed ✅");
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">📚 Books</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {books.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl"
          >
            <h3 className="font-bold">{b.title}</h3>
            <p className="text-gray-400 text-sm">{b.author}</p>
            <p className="text-sm">Qty: {b.quantity}</p>

            <button
              onClick={() => borrow(b.id)}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl"
            >
              Borrow
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default BookList;