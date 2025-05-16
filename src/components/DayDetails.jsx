import React from "react";
import { getIcon } from "./iconMaper";

const DayDetails = ({ selectedDateInfo }) => {
  if (!selectedDateInfo) return null;

  return (
    <div className={`mt-6 max-w-sm mx-auto shadow-md rounded-lg p-4 border text-center ${selectedDateInfo.color}`}>
      <div className="text-xl font-semibold mb-2">{selectedDateInfo.date}</div>
      <div className="text-lg flex justify-center items-center gap-2">
        {getIcon(selectedDateInfo.icon)}
        {selectedDateInfo.shift}
      </div>
    </div>
  );
};

export default DayDetails;