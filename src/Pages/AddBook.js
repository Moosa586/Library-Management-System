import React from "react";

function AddBook() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>
      <input className="block border p-2 mb-3 w-full" placeholder="Book Name" />
      <input className="block border p-2 mb-3 w-full" placeholder="Author" />
      <input className="block border p-2 mb-3 w-full" placeholder="Quantity" />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </div>
  );
}

export default AddBook;
