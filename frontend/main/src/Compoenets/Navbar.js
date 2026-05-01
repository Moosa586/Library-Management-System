import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const role = user?.role;

  return (
    <nav className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* LOGO */}
      <h1 className="text-xl font-bold text-blue-400">📚 Library System</h1>

      {/* LINKS */}
      <div className="flex gap-5 items-center text-sm md:text-base">
        <Link className="hover:text-blue-400 transition" to="/">
          Home
        </Link>

        <Link className="hover:text-blue-400 transition" to="/books">
          Books
        </Link>

        <Link className="hover:text-blue-400 transition" to="/about">
          About
        </Link>

        <Link className="hover:text-blue-400 transition" to="/contact">
          Contact
        </Link>

        {/* AFTER LOGIN SHOW DASHBOARD */}
        {user && (
          <Link
            className="hover:text-green-400 font-semibold transition"
            to={role === "admin" ? "/dashboard" : "/user-dashboard"}
          >
            Dashboard
          </Link>
        )}

        {/* AUTH SECTION */}
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
