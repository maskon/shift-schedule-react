import React, { useEffect, useState } from "react";

const EditShiftModal = ({ shift, onClose, onApply }) => {
  const [selectedShift, setSelectedShift] = useState(shift.name);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleApply = () => {
    onApply(shift.day, selectedShift);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(null), 200);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleModalClick}
    >
      <div
        className={`bg-white dark:bg-slate-800 p-6 rounded shadow-lg w-80 transform transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } relative`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Изменить смену</h2>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
        >
          <option>1 смена</option>
          <option>2 смена</option>
          <option>3 смена</option>
          <option>Выходной</option>
        </select>

        <button
          onClick={handleApply}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default EditShiftModal;
