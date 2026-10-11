import React, { useState } from "react";

interface LeaveFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  substitute: string;
}

const LeaveApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<LeaveFormData>({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    substitute: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/v1/elm/applications/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-lg">
      <h2 className="text-xl font-bold">Apply for Leave</h2>
      <div>
        <label>Leave Type:</label>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} className="border p-1 w-full">
          <option value="">Select</option>
          <option value="CL">Casual Leave (CL)</option>
          <option value="RH">Restricted Holiday (RH)</option>
          <option value="SCL">Special Casual Leave (SCL)</option>
          <option value="EL">Earned Leave (EL)</option>
          <option value="VL">Vacation Leave (VL)</option>
          <option value="COL">Commuted Leave (COL)</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="border p-1 w-full" />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="border p-1 w-full" />
      </div>
      <div>
        <label>Reason:</label>
        <textarea name="reason" value={formData.reason} onChange={handleChange} className="border p-1 w-full" />
      </div>
      <div>
        <label>Substitute:</label>
        <input type="text" name="substitute" value={formData.substitute} onChange={handleChange} className="border p-1 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default LeaveApplicationForm;
