import React from "react";
import Logo from "../Images/logo.webp"; // 👈 apna logo path

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* HERO */}
      <div className="text-center py-20 px-6">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Library Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg rounded-full border border-white/20"
          />
        </div>

        {/* HEADING */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About Our Library System
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          A modern digital solution designed to simplify library management,
          improve user experience, and bring books closer to everyone.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-8 pb-16">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📚 Smart Book System</h3>
          <p className="text-gray-400">
            Easily manage books, track availability, and organize collections
            efficiently.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">👤 User Friendly</h3>
          <p className="text-gray-400">
            Designed with simplicity so both admins and users can use it without
            confusion.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">🚀 Fast & Secure</h3>
          <p className="text-gray-400">
            Built using modern technologies to ensure speed, security, and
            reliability.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="px-8 py-16 bg-black/40">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">1️⃣</div>
            <h3 className="font-semibold">Register / Login</h3>
            <p className="text-gray-400 text-sm mt-2">
              Create your account or login to access the system.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-2">2️⃣</div>
            <h3 className="font-semibold">Browse Books</h3>
            <p className="text-gray-400 text-sm mt-2">
              Explore available books and read them online.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-2">3️⃣</div>
            <h3 className="font-semibold">Borrow & Manage</h3>
            <p className="text-gray-400 text-sm mt-2">
              Request books and track your borrowing history.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-300">
          Our goal is to transform traditional libraries into digital platforms
          where users can easily access books anytime, anywhere.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pb-16">
        <h3 className="text-xl mb-4">Ready to explore?</h3>
        <a
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default About;
