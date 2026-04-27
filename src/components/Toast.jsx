import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      background: "#1a5c38",
      color: "#fff",
      padding: "0.85rem 1.2rem",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
      fontSize: "0.875rem",
      fontWeight: "500",
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.3s ease",
    }}>
      <CheckCircle size={16} />
      {message}
    </div>
  );
}
