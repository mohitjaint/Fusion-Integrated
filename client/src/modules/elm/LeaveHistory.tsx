import React, { useEffect, useState } from "react";

const LeaveHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/elm/applications/")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leave Application History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx} className="border-b py-2">
            {item.leave_type}: {item.start_date} to {item.end_date} - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveHistory;
