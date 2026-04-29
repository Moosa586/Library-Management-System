import React from "react";

function BookList() {
  const books = [
    { id: 1, name: "Python", author: "Ali" },
    { id: 2, name: "JavaScript", author: "Ahmed" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-center">
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
