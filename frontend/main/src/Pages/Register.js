import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 REGISTER API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (data.status === "success") {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert("❌ " + (data.error || "User already exists"));
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert("❌ Server error, check backend");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Join the Library Management System
        </p>

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-green-500"
          placeholder="Full Name"
          required
        />

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-green-500"
          placeholder="Email"
          required
        />

        {/* Username */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-green-500"
          placeholder="Username"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-green-500"
          placeholder="Password"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold shadow-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-6 text-gray-300">
          Already have an account?{" "}
          <Link className="text-blue-400" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;