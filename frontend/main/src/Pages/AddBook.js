import React, { useState } from "react";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("Login required ❌");
      return;
    }

    if (!book.title || !book.author || !book.quantity) {
      alert("Please fill all fields ❌");
      return;
    }

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("quantity", book.quantity);

    if (file) formData.append("file", file);
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/add-book", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log("ADD BOOK RESPONSE:", data);

      if (res.status === 401) {
        alert("Session expired ❌ Please login again");
        return;
      }

      if (data.status === "success") {
        alert("📚 Book Added Successfully");

        setBook({ title: "", author: "", quantity: "" });
        setFile(null);
        setImage(null);
      } else {
        alert(data.error || "Failed to add book");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">📚 Add New Book</h2>

      <form onSubmit={handleAdd} className="flex flex-col gap-3">
        <input
          name="title"
          value={book.title}
          placeholder="Book Title"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="author"
          value={book.author}
          placeholder="Author"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="quantity"
          value={book.quantity}
          placeholder="Quantity"
          onChange={handleChange}
          className="border p-2"
        />

        {/* PDF */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
