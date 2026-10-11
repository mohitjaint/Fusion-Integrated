import React, { useEffect, useState } from "react";

interface Application {
  id: number;
  user: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
}

const LeaveApprovalQueue: React.FC = () => {
  const [queue, setQueue] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/v1/elm/applications/")
      .then((res) => res.json())
      .then((data) => setQueue(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leave Approval Queue</h2>
      <div className="space-y-2">
        {queue.map((item) => (
          <div key={item.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.leave_type} - {item.start_date} to {item.end_date}</p>
              <p className="text-sm text-gray-600">Status: {item.status}</p>
            </div>
            <div className="space-x-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveApprovalQueue;
