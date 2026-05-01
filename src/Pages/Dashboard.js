import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-xl">Total Books: 120</div>
        <div className="bg-white p-4 shadow rounded-xl">Issued Books: 45</div>
        <div className="bg-white p-4 shadow rounded-xl">Users: 30</div>
      </div>
    </div>
  );
}

export default Dashboard;
