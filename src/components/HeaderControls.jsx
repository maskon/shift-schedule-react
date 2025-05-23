import React from "react";
import { MdLightMode, MdDarkMode, MdSettings } from "react-icons/md";

const HeaderControls = ({
  selectedMonth = 0, // Значение по умолчанию
  selectedYear = new Date().getFullYear(), // Значение по умолчанию
  handleMonthChange = () => {}, // Пустая функция по умолчанию
  handleYearChange = () => {}, // Пустая функция по умолчанию
  toggleTheme,
  theme,
  isOpen,
  onOpenSettings,
  onCloseSettings
}) => {
  const safeSelectedMonth = selectedMonth ?? new Date().getMonth();
  const safeSelectedYear = selectedYear ?? new Date().getFullYear();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
      <button 
        onClick={toggleTheme} 
        className="p-2 max-[360px]:p-1.5 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer"
      >
        {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
      </button>

      <select
        value={safeSelectedMonth}
        onChange={(e) => handleMonthChange(parseInt(e.target.value))}
        className="px-4 py-2 max-[360px]:px-2 max-[360px]:py-1 rounded border dark:bg-slate-800 cursor-pointer text-sm"
      >
        {[...Array(12).keys()].map((m) => (
          <option key={m} value={m}>
            {new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(new Date(2023, m))}
          </option>
        ))}
      </select>

      <select
        value={safeSelectedYear}
        onChange={(e) => handleYearChange(parseInt(e.target.value))}
        className="px-4 py-2 max-[360px]:px-2 max-[360px]:py-1 rounded border dark:bg-slate-800 cursor-pointer text-sm"
      >
        {[...Array(20).keys()].map((y) => {
          const year = new Date().getFullYear() - 2 + y;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <button
        onClick={isOpen ? onCloseSettings : onOpenSettings}
        className="p-2 max-[360px]:p-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-black dark:text-white transition-transform duration-300 hover:rotate-90 cursor-pointer"
        title="Настройки"
      >
        <MdSettings size={20} />
      </button>
    </div>
  );
};

export default HeaderControls;