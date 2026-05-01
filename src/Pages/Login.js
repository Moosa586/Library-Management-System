import React from "react";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Library Login</h2>
        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Username"
        />
        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
