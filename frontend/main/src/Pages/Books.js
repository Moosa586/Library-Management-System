import React, { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH BOOKS
  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/books", {
        headers: {
          Authorization: `Bearer ${user?.token || ""}`,
        },
      });

      const data = await res.json();

      console.log("BOOKS API RESPONSE:", data);

      // ✅ SAFE CHECK (IMPORTANT FIX)
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
        console.log("Invalid books response:", data);
      }
    } catch (error) {
      console.log("Error loading books:", error);
      setBooks([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ SAFE FILTER (CRASH FIX)
  const filteredBooks = (books || []).filter((b) => {
    const title = b?.title?.toLowerCase() || "";
    const author = b?.author?.toLowerCase() || "";
    const query = search.toLowerCase();

    return title.includes(query) || author.includes(query);
  });

  // BORROW REQUEST
  const requestBorrow = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/request-borrow/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token || ""}`,
        },
      });

      const data = await res.json();
      alert(data.message || "Request sent");
    } catch (err) {
      alert("Error sending request");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
        📚 Library Books Collection
      </h1>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl p-3 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-blue-500"
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-400">Loading books...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* EMPTY STATE */}
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-400 col-span-3">
              No books found
            </p>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:scale-105 transition"
              >
                {/* TITLE */}
                <h2 className="text-xl font-bold text-blue-300">
                  {book.title}
                </h2>

                {/* AUTHOR */}
                <p className="text-gray-400 mt-1">Author: {book.author}</p>

                {/* QUANTITY */}
                <p className="text-gray-400">Available: {book.quantity}</p>

                {/* FILE */}
                {book.file && (
                  <a
                    href={`http://127.0.0.1:5000/uploads/${book.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 underline block mt-2"
                  >
                    📖 Open Book File
                  </a>
                )}

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => requestBorrow(book.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm"
                  >
                    Request Borrow
                  </button>

                  {book.file && (
                    <a
                      href={`http://127.0.0.1:5000/uploads/${book.file}`}
                      download
                      className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Books;
