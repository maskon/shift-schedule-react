import React from "react";

const CalendarGrid = ({ weekDays, shifts, handleDayClick }) => (
  <div className="max-w-xs sm:max-w-sm mx-auto text-center" style={{ minWidth: "280px" }}>
    <div className="grid grid-cols-7 gap-1 mb-2">
      {weekDays.map((day, idx) => (
        <div key={idx} className="text-sm font-medium">
          {day}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-7 gap-1">
      {shifts.map((shift, idx) => (
        <div
          key={idx}
          className={`w-10 h-10 rounded flex items-center justify-center text-sm cursor-pointer ${shift.color}`}
          onClick={() => handleDayClick(shift)}
        >
          {shift.day}
        </div>
      ))}
    </div>
  </div>
);

export default CalendarGrid;