import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed md:static z-50 h-full w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-5 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold text-blue-400 mb-8">
          📚 Library SaaS
        </h1>

        <nav className="flex flex-col gap-4 text-sm">
          <Link className="hover:text-blue-400" to="/dashboard">
            🏠 Dashboard
          </Link>
          <Link className="hover:text-blue-400" to="/books">
            📚 Books
          </Link>
          <Link className="hover:text-blue-400" to="/users">
            👤 Users
          </Link>
          <Link className="hover:text-blue-400" to="/borrows">
            📖 Borrows
          </Link>
        </nav>

        <div className="mt-10 text-xs text-gray-400">
          Logged in as: {user?.username}
        </div>
      </div>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-xl p-4 flex justify-between items-center border-b border-white/10">
        <button onClick={() => setOpen(!open)} className="text-xl">
          ☰
        </button>
        <h2 className="text-blue-400 font-bold">Dashboard</h2>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">{children}</div>
    </div>
  );
}

export default AdminLayout;
