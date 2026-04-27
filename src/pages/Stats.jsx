import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useTimeline } from "../context/TimelineContext";

const COLORS = { Call: "#1a5c38", Text: "#6366f1", Video: "#0891b2", Meetup: "#ca8a04" };

export default function Stats() {
  const { entries } = useTimeline();

  const counts = entries.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Friendship Analytics
        </h1>

        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "1.5rem" }}>By Interaction Type</h2>

          <div style={{ height: "320px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name] || "#ccc"} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} interactions`, name]} />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#555" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary table */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
            {data.map(({ name, value }) => (
              <div key={name} style={{
                background: "#f8f9fb", borderRadius: "10px", padding: "1rem", textAlign: "center",
                borderLeft: `4px solid ${COLORS[name] || "#ccc"}`,
              }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: COLORS[name] || "#ccc" }}>{value}</div>
                <div style={{ fontSize: "0.75rem", color: "#888", fontWeight: "600", marginTop: "2px" }}>{name}s</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
