import React from "react";

function BookCard({ book, onDelete, onBorrow }) {
  return (
    <div style={{
      background: "#1f2937",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "10px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      {/* LEFT */}
      <div>
        <h3>{book.title}</h3>
        <p>👤 {book.author}</p>
        <p>📦 Qty: {book.quantity}</p>
      </div>

      {/* RIGHT BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        {onBorrow && (
          <button
            onClick={() => onBorrow(book.id)}
            style={{
              background: "#22c55e",
              padding: "6px 10px",
              borderRadius: "6px",
              color: "white"
            }}
          >
            Borrow
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(book.id)}
            style={{
              background: "#ef4444",
              padding: "6px 10px",
              borderRadius: "6px",
              color: "white"
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;