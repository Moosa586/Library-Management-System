import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
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

      let data;

      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ SUCCESS
      if (data.token) {
        // 🔥 clear old session (IMPORTANT FIX)
        localStorage.removeItem("user");

        // save new session
        localStorage.setItem("user", JSON.stringify(data));

        // 🔥 trigger navbar update instantly
        window.dispatchEvent(new Event("storage"));

        alert(`Welcome ${data.username} ✅`);

        // ROLE BASED REDIRECT
        if (data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        throw new Error("Token missing from server");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert(error.message || "Server error, please try again");

      // ❌ if error → remove bad token
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

        {/* USERNAME */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-blue-500"
          placeholder="Username"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-gray-500 outline-none focus:border-blue-500"
          placeholder="Password"
        />

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* EXTRA LINKS */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>

          <Link to="/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>
        </div>

        {/* REGISTER */}
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
