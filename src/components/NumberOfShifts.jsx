import React from "react";

function NumberOfShifts({ shiftSummary}) {
    return ( 
        <div className="mt-4 p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded shadow-md">
            <p className="text-sm">Всего смен: <strong>{shiftSummary.total}</strong></p>
            <p className="text-sm">Ночных смен: <strong>{shiftSummary.night}</strong></p>
        </div>
     );
}

export default NumberOfShifts;