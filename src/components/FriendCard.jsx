import { useNavigate } from "react-router-dom";

const statusColors = {
  overdue: { bg: "#fee2e2", color: "#dc2626", label: "Overdue" },
  "almost due": { bg: "#fef9c3", color: "#ca8a04", label: "Almost Due" },
  "on-track": { bg: "#dcfce7", color: "#16a34a", label: "On Track" },
};

export default function FriendCard({ friend }) {
  const navigate = useNavigate();
  const status = statusColors[friend.status] || statusColors["on-track"];

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "1.25rem",
        cursor: "pointer",
        border: "1px solid #f0f0f0",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      <img
        src={friend.picture}
        alt={friend.name}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
          margin: "0 auto 0.75rem",
          border: "3px solid #f0f0f0",
        }}
      />
      <h3 style={{ fontSize: "0.875rem", fontWeight: "700", textAlign: "center", marginBottom: "0.25rem", color: "#1a1a1a" }}>
        {friend.name}
      </h3>
      <p style={{ fontSize: "0.75rem", color: "#888", textAlign: "center", marginBottom: "0.75rem" }}>
        {friend.days_since_contact} days ago
      </p>
      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "0.6rem" }}>
        {friend.tags.map(tag => (
          <span key={tag} style={{
            background: "#f0fdf4",
            color: "#16a34a",
            fontSize: "0.65rem",
            fontWeight: "600",
            padding: "2px 8px",
            borderRadius: "999px",
            border: "1px solid #bbf7d0",
          }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <span style={{
          background: status.bg,
          color: status.color,
          fontSize: "0.7rem",
          fontWeight: "700",
          padding: "3px 10px",
          borderRadius: "999px",
        }}>
          {status.label}
        </span>
      </div>
    </div>
  );
}
