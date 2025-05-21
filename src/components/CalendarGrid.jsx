import React from "react";

const CalendarGrid = ({ weekDays, shifts, handleDayClick, onEdit }) => {
  
  return (
  <div className="max-w-xs sm:max-w-sm mx-auto text-center" style={{ minWidth: "280px" }}>
    <div className="grid grid-cols-7 gap-1 mb-2">
      {weekDays.map((day, idx) => (
        <div key={idx} className="text-sm font-medium">
          {day}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-7 gap-1">
      {shifts.map((shift, idx) => {
        let pressTimer;
        
      const handleTouchStart = () => {
        pressTimer = setTimeout(() => {
          onEdit(shift);
        }, 500);
      };

      const handleTouchEnd = () => {
        clearTimeout(pressTimer);
      };

      return (
        <div
          key={idx}
          className={`w-10 h-10 rounded flex items-center justify-center text-sm cursor-pointer ${shift.color}`}
          onClick={() => handleDayClick(shift)}
          onDoubleClick={() => {
            onEdit(shift)
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {shift.day}
        </div>
      )})}
    </div>
  </div>
  )
};

export default CalendarGrid;