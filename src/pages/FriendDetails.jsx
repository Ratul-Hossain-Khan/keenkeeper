import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, MessageSquare, Video, Archive, Trash2, Clock, ChevronLeft, Edit2, Bell } from "lucide-react";
import friendsData from "../data/friends.json";
import { useTimeline } from "../context/TimelineContext";
import Toast from "../components/Toast";

const statusColors = {
  overdue: { bg: "#fee2e2", color: "#dc2626", label: "Overdue" },
  "almost due": { bg: "#fef9c3", color: "#ca8a04", label: "Almost Due" },
  "on-track": { bg: "#dcfce7", color: "#16a34a", label: "On Track" },
};

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [toast, setToast] = useState(null);
  const [goal, setGoal] = useState(null);

  const friend = friendsData.find(f => f.id === parseInt(id));
  if (!friend) return <div style={{ padding: "3rem", textAlign: "center" }}>Friend not found.</div>;

  const status = statusColors[friend.status] || statusColors["on-track"];
  const currentGoal = goal ?? friend.goal;

  const handleCheckIn = (type) => {
    addEntry(friend.id, friend.name, type);
    setToast(`${type} with ${friend.name} logged!`);
  };

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Back button */}
        <button onClick={() => navigate("/")} style={{
          background: "none", border: "none", color: "#1a5c38", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem",
          fontWeight: "600", marginBottom: "1.5rem", padding: 0,
        }}>
          <ChevronLeft size={16} /> Back to Friends
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* LEFT COLUMN */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem 1.5rem", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <img src={friend.picture} alt={friend.name} style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "4px solid #f0f0f0", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.5rem" }}>{friend.name}</h2>
            <span style={{ background: status.bg, color: status.color, fontSize: "0.75rem", fontWeight: "700", padding: "4px 12px", borderRadius: "999px", display: "inline-block", marginBottom: "1rem" }}>
              {status.label}
            </span>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1rem" }}>
              {friend.tags.map(tag => (
                <span key={tag} style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "0.7rem", fontWeight: "600", padding: "3px 10px", borderRadius: "999px", border: "1px solid #bbf7d0" }}>{tag}</span>
              ))}
            </div>
            <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: "1.6", marginBottom: "1rem", textAlign: "left" }}>{friend.bio}</p>
            <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "1.5rem", textAlign: "left" }}>📧 {friend.email}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button style={actionBtn("#fff3cd", "#ca8a04")}><Bell size={14} /> Snooze 2 Weeks</button>
              <button style={actionBtn("#f0f9ff", "#0369a1")}><Archive size={14} /> Archive</button>
              <button style={actionBtn("#fef2f2", "#dc2626")}><Trash2 size={14} /> Delete</button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {[
                { label: "Days Since Contact", value: friend.days_since_contact },
                { label: "Goal (days)", value: currentGoal },
                { label: "Next Due Date", value: friend.next_due_date },
              ].map((stat, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e5e7eb", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1a5c38", marginBottom: "0.3rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#888", fontWeight: "500" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Relationship Goal */}
            <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h3 style={{ fontWeight: "700", color: "#1a1a1a", fontSize: "0.95rem" }}>Relationship Goal</h3>
                <button
                  onClick={() => setGoal(g => g ? null : friend.goal)}
                  style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "4px 12px", cursor: "pointer", fontSize: "0.78rem", fontWeight: "600", color: "#555", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Edit2 size={12} /> Edit
                </button>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#666" }}>
                The perfect catchup interval is <strong style={{ color: "#1a5c38" }}>{currentGoal} days</strong>. Contact them every {currentGoal} days.
              </p>
              <p style={{ fontSize: "0.78rem", color: "#888", marginTop: "0.4rem" }}>Current goal: {currentGoal} days</p>
            </div>

            {/* Quick Check-In */}
            <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontWeight: "700", color: "#1a1a1a", fontSize: "0.95rem", marginBottom: "1rem" }}>Quick Check-In</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                {[
                  { type: "Call", icon: <Phone size={18} />, color: "#1a5c38" },
                  { type: "Text", icon: <MessageSquare size={18} />, color: "#6366f1" },
                  { type: "Video", icon: <Video size={18} />, color: "#0891b2" },
                ].map(({ type, icon, color }) => (
                  <button key={type} onClick={() => handleCheckIn(type)} style={{
                    flex: 1, background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "12px",
                    padding: "1rem 0.5rem", cursor: "pointer", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "0.5rem", color, fontWeight: "600", fontSize: "0.82rem",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.borderColor = color; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f8f9fb"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
                  >
                    {icon} {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function actionBtn(bg, color) {
  return {
    background: bg, color, border: `1px solid ${color}33`, borderRadius: "10px",
    padding: "8px 14px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    transition: "opacity 0.2s",
  };
}
