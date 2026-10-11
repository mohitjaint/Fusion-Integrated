import React, { useEffect, useState } from "react";

interface LeaveBalance {
  id: number;
  leave_type: string;
  balance: number;
}

const LeaveBalanceDashboard: React.FC = () => {
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);

  useEffect(() => {
    fetch("/api/v1/elm/balances/")
      .then((res) => res.json())
      .then((data) => setLeaveBalances(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leave Balance Dashboard</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Leave Type</th>
            <th className="border p-2">Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {leaveBalances.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.leave_type}</td>
              <td className="border p-2">{b.balance} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveBalanceDashboard;
