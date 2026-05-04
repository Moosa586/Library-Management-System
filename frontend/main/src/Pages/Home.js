import React, { useEffect, useState } from "react";
import Logo from "../Images/logo.webp";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");

  // ================= FETCH BOOKS =================
  const fetchBooks = async (query = "") => {
    try {
      const url = query
        ? `http://127.0.0.1:5000/search?q=${query}`
        : "http://127.0.0.1:5000/books";

      const res = await fetch(url);
      const data = await res.json();

      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks("");
  }, []);

  // ================= SEARCH =================
  const handleSearch = () => {
    fetchBooks(search);
  };

  // ================= FILTER =================
  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();

    if (!q) return true;

    if (filter === "title") return b.title?.toLowerCase().includes(q);
    if (filter === "author") return b.author?.toLowerCase().includes(q);
    if (filter === "quantity") return String(b.quantity).includes(q);

    return true;
  });

  // ================= CATEGORIES =================
  const booksData = filteredBooks.filter((b) => b.category === "book");
  const magazines = filteredBooks.filter((b) => b.category === "magazine");
  const journals = filteredBooks.filter((b) => b.category === "journal");

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      {/* ================= HERO ================= */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6 py-32"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full border border-white/20 shadow-xl">
              <img src={Logo} className="w-20 h-20 rounded-full object-cover" />
            </div>
          </div>

          <h1 className="text-5xl font-bold">Smart Library System</h1>

          <p className="text-gray-300 mt-4 mb-10">
            Explore Books • Magazines • Journals
          </p>

          {/* SEARCH */}
          <div className="flex flex-col md:flex-row gap-3 bg-white/10 p-5 rounded-2xl border border-white/20">
            <input
              type="text"
              placeholder="Search books, authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-3 bg-transparent border border-gray-500 rounded-lg outline-none"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 bg-black border border-gray-500 rounded-lg"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="quantity">Quantity</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-blue-600 px-6 py-3 rounded-lg font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOOKS SECTION ================= */}
      <Section title="📚 Books" data={booksData} />

      {/* ================= MAGAZINES ================= */}
      <Section title="📰 Magazines" data={magazines} />

      {/* ================= JOURNALS ================= */}
      <Section title="📘 Journals" data={journals} />

      {/* ================= POPULAR ================= */}
      <Section title="🔥 Popular Books" data={filteredBooks.slice(0, 8)} />
    </div>
  );
}

// ================= REUSABLE COMPONENT =================
function Section({ title, data }) {
  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">{title}</h2>

      {data.length === 0 ? (
        <p className="text-gray-400">No items found</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {data.map((book) => (
            <div
              key={book.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img
                src={
                  book.image
                    ? `http://127.0.0.1:5000/uploads/${book.image}`
                    : "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                }
                className="h-40 w-full object-cover"
                alt={book.title}
              />

              <div className="p-4 text-center">
                <h3 className="font-bold">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
                <span className="text-xs text-gray-500">{book.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
