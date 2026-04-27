import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "#1a1a1a", letterSpacing: "-0.02em" }}>
        KeenKeeper
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[
          { to: "/", label: "Home", icon: <Home size={14} /> },
          { to: "/timeline", label: "Timeline", icon: <Clock size={14} /> },
          { to: "/stats", label: "Stats", icon: <BarChart2 size={14} /> },
        ].map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "0.82rem",
              fontWeight: "500",
              textDecoration: "none",
              transition: "all 0.15s",
              background: isActive ? "#1a5c38" : "transparent",
              color: isActive ? "#fff" : "#555",
            })}
          >
            {icon} {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
