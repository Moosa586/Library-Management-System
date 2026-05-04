import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password.trim(),
        }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.token) {
        // ✅ FIX: store full session properly
        const userData = {
          token: data.token,
          role: data.role,
          username: form.username, // 🔥 FIX (important)
        };

        localStorage.setItem("user", JSON.stringify(userData));

        // navbar update trigger
        window.dispatchEvent(new Event("storage"));

        alert(`Welcome ${form.username} ✅`);

        // redirect
        if (data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        throw new Error("Token missing from server");
      }
    } catch (error) {
      console.log(error);
      alert(error.message || "Server error");
      localStorage.removeItem("user");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Library Login</h2>

        <p className="text-center text-gray-300 mb-6">Login as Admin or User</p>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-blue-500"
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-blue-500"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>

          <Link to="/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>
        </div>

        <p className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <Link className="text-blue-400" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
