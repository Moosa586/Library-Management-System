import React, { useState } from "react";

function SearchBar({ setBooks }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token) {
      alert("Login required");
      return;
    }

    if (!query.trim()) {
      alert("Please enter search text");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/search?q=${query}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.log(err);
      setBooks([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
      <input
        className="border p-2 w-full"
        placeholder="Search books by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="bg-blue-500 px-4 text-white">🔍 Search</button>
    </form>
  );
}

export default SearchBar;
