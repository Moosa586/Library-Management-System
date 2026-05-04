import React from "react";
import Logo from "../Images/logo.webp";
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-300 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo / About */}
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-4">
            <img src={Logo} alt="Library Logo" className="w-10 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Library System</h2>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            A modern library management platform to manage books, users, and
            transactions efficiently with a smooth and user-friendly experience.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-lg">
            <a href="#" className="hover:text-white transition">
              🌐
            </a>
            <a href="#" className="hover:text-white transition">
              🐦
            </a>
            <a href="#" className="hover:text-white transition">
              📘
            </a>
            <a href="#" className="hover:text-white transition">
              📸
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Info
          </h3>

          <div className="space-y-3 text-sm text-gray-400">
            <p>📧 support@library.com</p>
            <p>📞 +92 300 0000000</p>
            <p>📍 Karachi, Pakistan</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h3>

          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get latest updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-sm bg-gray-800 text-white outline-none rounded-l-md"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 text-white text-sm rounded-r-md transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2026 Library Management System. Developed By Moosa. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
