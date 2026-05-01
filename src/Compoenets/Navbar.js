import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-green-500 tracking-wide hover:scale-105 transition">
          Library Management System
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>
          <Link to="/books" className="hover:text-blue-400 transition">
            Books
          </Link>
          <Link to="/add-book" className="hover:text-blue-400 transition">
            Add Book
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 px-6 overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-60 py-4" : "max-h-0"}`}
      >
        <Link to="/" className="block py-2 hover:text-blue-400">
          Home
        </Link>
        <Link to="/dashboard" className="block py-2 hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/books" className="block py-2 hover:text-blue-400">
          Books
        </Link>
        <Link to="/add-book" className="block py-2 hover:text-blue-400">
          Add Book
        </Link>
        <Link to="/login" className="block py-2 hover:text-blue-400">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
