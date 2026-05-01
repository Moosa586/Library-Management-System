import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Library System</h2>
          <p className="text-sm text-gray-400">
            A modern library management platform to manage books, users, and
            transactions efficiently.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/books" className="hover:text-white">
                Books
              </a>
            </li>
            <li>
              <a href="/add-book" className="hover:text-white">
                Add Book
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@library.com</p>
          <p className="text-sm text-gray-400">Phone: +92 300 0000000</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2026 Library Management System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
