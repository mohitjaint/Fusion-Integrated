import React, { useEffect, useState } from "react";

const HolidayCalendar: React.FC = () => {
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/elm/holidays/")
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Holiday Calendar</h2>
      <ul className="list-disc pl-5">
        {holidays.map((h, i) => (
          <li key={i}>{h.date}: {h.description} {h.is_rh ? "(Restricted Holiday)" : ""}</li>
        ))}
      </ul>
    </div>
  );
};

export default HolidayCalendar;
