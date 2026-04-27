import { useState, useEffect } from "react";
import { UserPlus, Users, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import FriendCard from "../components/FriendCard";
import friendsData from "../data/friends.json";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === "on-track").length;
  const almostDue = friends.filter(f => f.status === "almost due").length;
  const interactionsThisMonth = 12;

  const summaryCards = [
    { label: "Total Friends", value: totalFriends, icon: <Users size={18} />, color: "#1a5c38" },
    { label: "On Track", value: onTrack, icon: <CheckCircle size={18} />, color: "#16a34a" },
    { label: "Near Attention", value: almostDue, icon: <AlertCircle size={18} />, color: "#ca8a04" },
    { label: "Interactions This Month", value: interactionsThisMonth, icon: <Calendar size={18} />, color: "#6366f1" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb" }}>
      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #fff 0%, #f0fdf4 100%)",
        padding: "3rem 2rem 2rem",
        textAlign: "center",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
          Friends to keep close in your life
        </h1>
        <p style={{ color: "#666", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
          Stay meaningful with your connections. Browse, track, and nurture the relationships that matter most to you.
        </p>
        <button style={{
          background: "#1a5c38",
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          padding: "10px 22px",
          fontSize: "0.875rem",
          fontWeight: "600",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#14472c"}
          onMouseLeave={e => e.currentTarget.style.background = "#1a5c38"}
        >
          <UserPlus size={15} /> Add a Friend
        </button>

        {/* Summary Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          maxWidth: "700px",
          margin: "2rem auto 0",
        }}>
          {summaryCards.map((card, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              <div style={{ color: card.color, marginBottom: "0.4rem", display: "flex", justifyContent: "center" }}>
                {card.icon}
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1a1a1a", lineHeight: 1 }}>
                {loading ? "—" : card.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "0.3rem", fontWeight: "500" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1.25rem" }}>
          Your Friends
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{
              width: "40px", height: "40px", border: "3px solid #e5e7eb",
              borderTop: "3px solid #1a5c38", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 1rem",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: "#888", fontSize: "0.875rem" }}>Loading your friends...</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}>
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .friends-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .friends-grid { grid-template-columns: 1fr !important; }
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
