import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

const initialEntries = [
  { id: 1, friendId: 1, friendName: "Emma Wilson", type: "Meetup", date: "March 28, 2026" },
  { id: 2, friendId: 5, friendName: "Sarah Chen", type: "Text", date: "March 28, 2026" },
  { id: 3, friendId: 4, friendName: "James Wright", type: "Meetup", date: "March 26, 2026" },
  { id: 4, friendId: 7, friendName: "Olivia Martinez", type: "Video", date: "March 25, 2026" },
  { id: 5, friendId: 1, friendName: "Emma Wilson", type: "Meetup", date: "March 21, 2026" },
  { id: 6, friendId: 6, friendName: "Marcus Johnson", type: "Call", date: "March 19, 2026" },
  { id: 7, friendId: 3, friendName: "Lisa Nakamura", type: "Call", date: "March 12, 2026" },
  { id: 8, friendId: 5, friendName: "Sarah Chen", type: "Call", date: "March 9, 2026" },
  { id: 9, friendId: 6, friendName: "Marcus Johnson", type: "Video", date: "March 8, 2026" },
  { id: 10, friendId: 8, friendName: "Ryan O'Brien", type: "Video", date: "March 4, 2026" },
];

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  const addEntry = (friendId, friendName, type) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const newEntry = {
      id: Date.now(),
      friendId,
      friendName,
      type,
      date: dateStr,
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
