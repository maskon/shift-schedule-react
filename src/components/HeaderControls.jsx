import React from "react";
import { MdLightMode, MdDarkMode, MdSettings } from "react-icons/md"

const HeaderControls = ({
  selectedMonth,
  selectedYear,
  handleMonthChange,
  handleYearChange,
  toggleTheme,
  theme,
  isOpen,
  onOpenSettings,
  onCloseSettings
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-4">     
      <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer">
        {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
      </button>

      <select
        value={selectedMonth ?? ""}
        onChange={handleMonthChange}
        className="px-4 py-2 rounded border dark:bg-slate-800 cursor-pointer"
      >
        {[...Array(12).keys()].map((m) => (
          <option key={m} value={m}>
            {new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(new Date(2023, m))}
          </option>
        ))}
      </select>

      <select
        value={selectedYear ?? ""}
        onChange={handleYearChange}
        className="px-4 py-2 rounded border dark:bg-slate-800 cursor-pointer"
      >
        {[...Array(20).keys()].map((y) => {
          const year = new Date().getFullYear() - 2 + y;
          return (
            <option key={y} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <button
        onClick={!isOpen ? onOpenSettings : onCloseSettings}
        className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-black dark:text-white transition-transform duration-300 hover:rotate-90 cursor-pointer"
        title="Настройки"
        >
        <MdSettings size={20} />
      </button>

    </div>
  );
};

export default HeaderControls;