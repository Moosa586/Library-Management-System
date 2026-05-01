import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const admin = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://127.0.0.1:5000/users", {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>

      {users.map((u) => (
        <div key={u.id}>
          👤 {u.name} | {u.username} | {u.email}
        </div>
      ))}
    </div>
  );
}

export default Users;
