import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "#1a3d2b",
      color: "#fff",
      padding: "3rem 2rem 2rem",
      textAlign: "center",
      marginTop: "auto",
    }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
        KeenKeeper
      </h2>
      <p style={{ color: "#a8c4b0", fontSize: "0.85rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
        Your personal tool of meaningful connections. Discover, bond, and nurture the relationships that matter most.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <p style={{ color: "#a8c4b0", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.5rem", width: "100%" }}>
          Social Links
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        {[Twitter, Github, Linkedin].map((Icon, i) => (
          <button key={i} style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}>
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "1.2rem",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
        fontSize: "0.75rem",
        color: "#a8c4b0",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <span>© 2026 KeenKeeper. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "#a8c4b0", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#a8c4b0", textDecoration: "none" }}>Terms of Service</a>
          <a href="#" style={{ color: "#a8c4b0", textDecoration: "none" }}>Contact</a>
        </div>
      </div>
    </footer>
  );
}
