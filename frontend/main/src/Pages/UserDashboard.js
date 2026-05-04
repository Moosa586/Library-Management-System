import React, { useEffect, useState } from "react";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  // FETCH BOOKS
  const fetchBooks = async (search = "") => {
    try {
      const url = search
        ? `http://127.0.0.1:5000/search?q=${search}`
        : "http://127.0.0.1:5000/books";

      const res = await fetch(url);
      const data = await res.json();

      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // OPEN PDF IN NEW PAGE
  const openPDFPage = (file) => {
    if (!file) {
      alert("No PDF available");
      return;
    }

    window.open(
      `http://127.0.0.1:5000/uploads/${file}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl mb-6">📚 Library System</h1>

      {/* SEARCH */}
      <input
        className="w-full p-3 mb-6 bg-gray-800 rounded"
        placeholder="Search books..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchBooks(e.target.value);
        }}
      />

      {/* BOOK GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b.id} className="bg-gray-900 p-4 rounded-xl">
            <img
              src={
                b.image
                  ? `http://127.0.0.1:5000/uploads/${b.image}`
                  : "https://via.placeholder.com/300"
              }
              className="w-full h-40 object-cover rounded mb-3"
              alt={b.title}
            />

            <h3 className="font-bold">{b.title}</h3>
            <p className="text-gray-400">{b.author}</p>

            {/* OPEN PDF NEW PAGE */}
            <button
              onClick={() => openPDFPage(b.file)}
              className="mt-3 w-full bg-blue-600 p-2 rounded"
            >
              Read Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
