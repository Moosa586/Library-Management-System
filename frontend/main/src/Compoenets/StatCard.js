export default function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
};
