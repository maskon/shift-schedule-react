import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import clsx from "clsx";
import { useSettings } from "../hooks/useSettings";

const SettingsPanel = ({ isOpen, onClose, onApplySuccess }) => {
  const {
    tempShift, setTempShift,
    draftShowShiftCount, setDraftShowShiftCount,
    draftShowSalary, setDraftShowSalary,
    draftHourlyRate, setDraftHourlyRate,
    rateError, setRateError,
    applySettings,
    isUnchanged,
    showNotification,
    draftConsiderHolidays,
    setDraftConsiderHolidays,
    // setShiftType
  } = useSettings();

  const handleShiftTypeChange = (e) => {
    const newShiftType = parseInt(e.target.value);
    setTempShift(newShiftType);
    // Только меняем временное значение, не применяем сразу
  };

  const handleApply = () => {
    // Очищаем переопределения только при применении
    localStorage.removeItem("shiftOverrides");
    const applied = applySettings();
    if (applied) {
      onApplySuccess?.();
      onClose();
    }
  };


  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-full w-full max-w-md overflow-y-auto bg-white dark:bg-slate-800 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 shadow-lg",
        { "translate-x-0": isOpen, "translate-x-full": !isOpen }
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <span className="text-lg font-semibold">Настройки</span>
        <button onClick={onClose} className="text-gray-500 cursor-pointer transition-text duration-300 hover:text-red-500">
          <IoMdClose size={30} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Выбор смены</label>
          <select 
            className="w-full p-2 border dark:border-gray-600 bg-white dark:bg-gray-700 rounded" 
            value={tempShift} 
            onChange={ handleShiftTypeChange } >
            <option value={0}>Смена 1</option>
            <option value={1}>Смена 2</option>
            <option value={2}>Смена 3</option>
            <option value={3}>Смена 4</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-2 border-t dark:border-gray-700">
          <label htmlFor="showShiftCount" className="text-sm font-medium">Показать количество смен?</label>
          <input id="showShiftCount" type="checkbox" checked={draftShowShiftCount} onChange={(e) => setDraftShowShiftCount(e.target.checked)} className="w-5 h-5 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between p-2 border-t dark:border-gray-700">
          <label htmlFor="showSalary" className="text-sm font-medium">Показать зарплату?</label>
          <input id="showSalary" type="checkbox" checked={draftShowSalary} onChange={(e) => setDraftShowSalary(e.target.checked)} className="w-5 h-5 cursor-pointer" />
        </div>

        {draftShowSalary && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1" htmlFor="hourlyRate">Тариф в час</label>
            <input
              type="number"
              id="hourlyRate"
              placeholder="Введите тариф"
              value={draftHourlyRate === "0" ? "" : draftHourlyRate}
              onChange={(e) => {
                setRateError("");
                setDraftHourlyRate(e.target.value);
              }}
              className="w-full p-2 border dark:border-gray-600 bg-white dark:bg-gray-700 rounded"
            />
              {rateError && <p className="text-red-500 text-sm mt-1">{rateError}</p>}
            <div className="flex items-center justify-between p-2 border-t border-gray-300 dark:border-gray-700 mt-2">
              <label htmlFor="considerHolidays" className="text-sm font-medium">
                Учитывать праздничные смены?
              </label>
              <input
                id="considerHolidays"
                type="checkbox"
                checked={draftConsiderHolidays}
                onChange={(e) => setDraftConsiderHolidays(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        )}

        <button 
          onClick={() => {
            const applied = applySettings();
            if (applied) {
              onApplySuccess?.();
              onClose();
            }
            handleApply();
          }} 
          disabled={isUnchanged} 
          className={clsx(
            "w-full flex items-center justify-center gap-2 p-2 rounded font-medium transition-colors",
            { "bg-blue-600 text-white cursor-pointer hover:bg-blue-700": !isUnchanged,
              "bg-gray-400 text-white cursor-not-allowed": isUnchanged }
          )}
        >
          <MdCheckCircle size={20} /><span>Применить</span>
        </button>
      </div>

      {showNotification && (
        <div className="absolute bottom-4 left-[25%] bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          Настройки применены!
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;