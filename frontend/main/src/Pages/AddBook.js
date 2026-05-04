import React, { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("book");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("file", file);
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5000/add-book", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Successfully Added!");
        setTitle("");
        setAuthor("");
        setCategory("book");
        setFile(null);
        setImage(null);
      } else {
        alert(data.error || "❌ Error adding item");
      }
    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">

      {/* CARD */}
      <div className="w-full max-w-xl bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
          📚 Add Book / Magazine / Journal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* AUTHOR */}
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
            placeholder="Enter Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="book">📘 Book</option>
            <option value="magazine">📰 Magazine</option>
            <option value="journal">📚 Journal</option>
          </select>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm text-gray-400">Upload PDF File</label>
            <input
              type="file"
              className="w-full mt-1 p-2 bg-gray-800 rounded"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm text-gray-400">Upload Cover Image</label>
            <input
              type="file"
              className="w-full mt-1 p-2 bg-gray-800 rounded"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
          >
            {loading ? "Adding..." : "➕ Add Item"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBook;