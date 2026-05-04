import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/logo.webp";
function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const role = user?.role;

  return (
    <nav className=" top-0 z-50 bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-800">
      {/* LOGO / BRAND */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Library Logo" className="w-10 h-10 rounded-full" />

        <div>
          <h1 className="text-xl font-bold text-blue-400 leading-tight">
            Library System
          </h1>
          <p className="text-xs text-gray-400 -mt-1">
            Manage your books easily
          </p>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-6 items-center text-sm md:text-base">
        <Link className="hover:text-blue-400 transition duration-200" to="/">
          Home
        </Link>

        <Link
          className="hover:text-blue-400 transition duration-200"
          to="/about"
        >
          About
        </Link>

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <Link
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
              to="/dashboard"
            >
              Admin Panel
            </Link>

            <Link
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition shadow-md"
              to="/add-book"
            >
              + Add Book
            </Link>
          </>
        )}

        {/* USER */}
        {role === "user" && (
          <Link
            className="text-green-400 font-semibold hover:text-green-300 transition"
            to="/user-dashboard"
          >
            My Dashboard
          </Link>
        )}

        {/* AUTH */}
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition shadow-md"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition shadow-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
