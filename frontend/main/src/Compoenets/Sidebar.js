import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>📚 LIBRARY SaaS</h2>

      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/books">Books</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/requests">Requests</Link>
      <Link to="/admin/borrows">Borrows</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    position: "fixed",
  },
  logo: {
    color: "#60a5fa",
    marginBottom: "20px",
  },
};