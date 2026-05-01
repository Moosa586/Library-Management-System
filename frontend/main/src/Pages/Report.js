import React from "react";

function Reports() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">📚 Total Books: 120</div>

        <div className="bg-gray-800 p-6 rounded-xl">📖 Issued Books: 45</div>

        <div className="bg-gray-800 p-6 rounded-xl">🔁 Returned Books: 30</div>

        <div className="bg-gray-800 p-6 rounded-xl">
          🔥 Most Popular: Python Basics
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">👤 Active Users: 15</div>
      </div>
    </div>
  );
}

export default Reports;
