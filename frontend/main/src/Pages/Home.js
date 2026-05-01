import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const fullText = "Smart Library Management System";

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(fullText.substring(0, index + 1));
        setIndex(index + 1);

        if (index === fullText.length) setIsDeleting(true);
      } else {
        setText(fullText.substring(0, index - 1));
        setIndex(index - 1);

        if (index === 0) setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-28">
        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          <span className="text-blue-400">{text}</span>
          <span className="animate-pulse text-blue-400">|</span>
        </h1>

        {/* SUB TEXT */}
        <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-10">
          Manage books, users, borrowing and fines with a modern library system.
        </p>

        {/* ONLY BUTTON */}
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 px-10 py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-6 md:px-16 pb-20">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📚 Book Management</h3>
          <p className="text-gray-400">
            Add, update, and track all library books in real-time.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">👤 User System</h3>
          <p className="text-gray-400">
            Secure login system for users and admin roles.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📊 Analytics</h3>
          <p className="text-gray-400">
            Track borrowing history and system insights.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
