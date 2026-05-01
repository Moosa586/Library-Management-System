import React, { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/books", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Library Books</h1>

      {/* BOOK GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl hover:scale-105 transition"
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
              {b.image ? (
                <img
                  src={`http://127.0.0.1:5000/${b.image}`}
                  alt={b.title}
                  className="h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* DETAILS */}
            <h2 className="text-lg font-bold">{b.title}</h2>
            <p className="text-gray-400 text-sm">{b.author}</p>

            <p className="text-xs mt-1 text-gray-500">
              Available: {b.quantity}
            </p>

            {/* ACTION */}
            <button
              onClick={() => setSelectedBook(b)}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
            >
              📖 Read Book
            </button>
          </div>
        ))}
      </div>

      {/* MODAL READER */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-[90%] h-[90%] rounded-2xl p-4 relative">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded"
            >
              ✖
            </button>

            <h2 className="text-xl mb-3">{selectedBook.title}</h2>

            {/* FILE VIEWER */}
            {selectedBook.file ? (
              <iframe
                src={`http://127.0.0.1:5000/${selectedBook.file}`}
                title="Book Reader"
                className="w-full h-full rounded"
              />
            ) : (
              <p className="text-gray-400">No file available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
