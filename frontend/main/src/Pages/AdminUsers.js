import React, { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://127.0.0.1:5000/users", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>👤 All Users</h2>

      {users.map((u) => (
        <div key={u.id}>
          <p>
            {u.name} | {u.email} | {u.username} | {u.role}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;
