import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Smart Library
          <span className="text-blue-500"> Management System</span>
        </h1>
        <p className="max-w-2xl text-gray-300 text-lg mb-8">
          A modern full-stack solution to manage books, users, and transactions
          efficiently with a beautiful interface.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="border border-gray-500 hover:bg-gray-700 px-6 py-3 rounded-xl"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📚 Book Management</h3>
          <p className="text-gray-400">
            Easily add, update, and manage all library books with stock
            tracking.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">👤 User System</h3>
          <p className="text-gray-400">
            Manage students and track issued books efficiently.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📊 Analytics</h3>
          <p className="text-gray-400">
            Get insights with dashboard stats and reports.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
