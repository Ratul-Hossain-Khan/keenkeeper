import { useState } from "react";
import { Phone, MessageSquare, Video, Users, Filter } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const typeConfig = {
  Call: { icon: <Phone size={15} />, color: "#1a5c38", bg: "#f0fdf4" },
  Text: { icon: <MessageSquare size={15} />, color: "#6366f1", bg: "#f0f0ff" },
  Video: { icon: <Video size={15} />, color: "#0891b2", bg: "#ecfeff" },
  Meetup: { icon: <Users size={15} />, color: "#ca8a04", bg: "#fefce8" },
};

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Call", "Text", "Video", "Meetup"];
  const filtered = filter === "All" ? entries : entries.filter(e => e.type === filter);

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1a1a1a", letterSpacing: "-0.02em" }}>Timeline</h1>

          {/* Filter buttons */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <Filter size={14} style={{ color: "#888", alignSelf: "center", marginRight: "4px" }} />
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 14px", borderRadius: "999px", border: "1px solid",
                borderColor: filter === f ? "#1a5c38" : "#e5e7eb",
                background: filter === f ? "#1a5c38" : "#fff",
                color: filter === f ? "#fff" : "#555",
                fontSize: "0.78rem", fontWeight: "600", cursor: "pointer",
                transition: "all 0.15s",
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Share timeline</p>

        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#888" }}>No entries for this filter.</div>
          ) : (
            filtered.map((entry, i) => {
              const config = typeConfig[entry.type] || typeConfig["Call"];
              return (
                <div key={entry.id} style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem 1.5rem",
                  borderBottom: i < filtered.length - 1 ? "1px solid #f0f0f0" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: config.bg, color: config.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {config.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "2px" }}>
                      <span style={{ fontWeight: "800" }}>{entry.type}</span> with {entry.friendName}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#888" }}>{entry.date}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
