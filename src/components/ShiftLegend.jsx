import React from "react";
import { getIcon } from "./iconMaper"; // убедись в правильном пути

const ShiftLegend = ({ shiftColors }) => (
  <div className="mt-6 space-y-2 text-sm text-center max-w-sm mx-auto">
    {shiftColors
      .filter(shift => shift.name !== "Выходной") // Фильтруем выходные
      .map((shift, i) => (
        <div key={i} className={`flex items-center justify-center gap-2 ${shift.color} p-2 rounded`}>
          {getIcon(shift.icon)}
          <span>{shift.name}</span>
        </div>
      ))}
  </div>
);

export default ShiftLegend;