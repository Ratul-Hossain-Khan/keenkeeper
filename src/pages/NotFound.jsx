import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8f9fb", textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "5rem", fontWeight: "900", color: "#e5e7eb", lineHeight: 1 }}>404</div>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1a1a1a", margin: "1rem 0 0.5rem" }}>Page Not Found</h2>
      <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Oops! This page doesn't exist.</p>
      <button onClick={() => navigate("/")} style={{
        background: "#1a5c38", color: "#fff", border: "none", borderRadius: "999px",
        padding: "10px 24px", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer",
      }}>
        Go Home
      </button>
    </div>
  );
}
