import React, { useState, useEffect, useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import { shiftColors } from "../utils/shiftConfig";
import { getTodayShiftInfo } from "../utils/getTodayShiftInfo";
import { generateShiftsForMonth } from "../utils/shiftUtils";
import { useTheme } from "../hooks/useTheme";
import { weekDays, generateHolidayDates } from "../utils/shiftConfig";
import HeaderControls from "./HeaderControls";
import CalendarGrid from "./CalendarGrid";
import DayDetails from "./DayDetails";
import ShiftLegend from "./ShiftLegend";
import SettingsPanel from "./SettingsPanel";
import NumberOfShifts from "./NumberOfShifts";
import SalarySummary from "./SalarySummary";

const ShiftsCalendar = () => {
  const { selectedMonth, selectedYear,shiftType,showShiftCount,showSalary,setSelectedMonth,setSelectedYear,shifts,setShifts,} = useAppStore();
  const considerHolidays = useAppStore((state) => state.considerHolidays);

  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const holidayDates = generateHolidayDates(selectedYear);
  const [showNotification, setShowNotification] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };

  useEffect(() => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  }, [setSelectedMonth, setSelectedYear]);

  useEffect(() => {
  const shifts = generateShiftsForMonth({
    month: selectedMonth,
    year: selectedYear,
    shiftType,
  });
  setShifts(shifts);
}, [selectedMonth, selectedYear, shiftType, setShifts]);

  useEffect(() => {
    const info = getTodayShiftInfo(selectedYear, selectedMonth, shiftType);
    if (info) setSelectedDateInfo(info);
  }, [shifts, selectedMonth, selectedYear, shiftType]);

  const handleMonthChange = (e) => setSelectedMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setSelectedYear(parseInt(e.target.value));
  const handleDayClick = (shift) => {
    if (!shift || !shift.day) return;
    const clickedDate = new Date(selectedYear, selectedMonth, shift.day);
    setSelectedDateInfo({
      date: clickedDate.toLocaleDateString("ru-RU"),
      shift: shift.name,
      color: shift.color,
      icon: shift.icon,
    });
  };

const shiftSummary = useMemo(() => {
    let total = 0;
    let night = 0;
    let holidayDayHours = 0;
    let holidayNightHours = 0;

    const createDate = (year, month, day) => {
        return new Date(Date.UTC(year, month, day, 12));
    };

    const shiftsMap = new Map();
    shifts.forEach(shift => {
        if (!shift?.day) return;
        const day = parseInt(shift.day);
        if (isNaN(day)) return;

        const date = createDate(selectedYear, selectedMonth, day);
        shiftsMap.set(date.toISOString().split('T')[0], shift);
    });

    const isHoliday = (date) => {
        return holidayDates.includes(date.toISOString().split('T')[0]);
    };

    for (let i = 0; i < shifts.length; i++) {
        const shift = shifts[i];
        if (!shift?.day) continue;

        const day = parseInt(shift.day);
        if (isNaN(day)) continue;

        const date = createDate(selectedYear, selectedMonth, day);

        if (shift.name !== "Выходной") total++;
        if (shift.name === "3 смена") night++;

        if (considerHolidays) {
          // Получение соседних элементов
          const previousShift = shifts[i - 1];  // - 1 элемент
          const prevPreviousShift = shifts[i - 2];  // - 2 элемент
          const nextShift = shifts[i + 1];      // + 1 элемент
          const nextNextShift = shifts[i + 2]; // + 2 элемент

          // Дневные смены
          ((shift?.name === "1 смена" || shift?.name === "2 смена") && isHoliday(date)) ? holidayDayHours += 8 : null;

          // Ночные смены
          if (shift?.name === "3 смена" && isHoliday(date)) {

            if ((nextShift?.name === "3 смена" && nextNextShift?.name === "3 смена") ||
              (previousShift?.name === "Выходной" && prevPreviousShift?.name === "1 смена")) {
                holidayNightHours += 1;
            }
            if ((nextShift?.name === "3 смена" && nextNextShift?.name === "Выходной") ||
              (nextShift?.name === "Выходной" && nextNextShift?.name === "2 смена") ||
              (previousShift?.name === "3 смена" && prevPreviousShift?.name === "Выходной") ||
              (previousShift?.name === "3 смена" && prevPreviousShift?.name === "3 смена")) {
                holidayNightHours += 8;
            }
          }

          // Выходной, но до праздника была 3 смена
          if ((shift?.name === "Выходной" && nextShift?.name === "2 смена" && isHoliday(date)) || 
            (shift?.name === "Выходной" && previousShift?.name === "3 смена" && isHoliday(date))) {
              holidayNightHours += 7;
          }
        }
    }

    return { total, night, holidayDayHours, holidayNightHours };
}, [shifts, considerHolidays, selectedMonth, selectedYear, holidayDates]);


  return (
    <div className="p-4 min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-900 dark:text-white transition">
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 bg-green-500/70 text-white text-center px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
          Настройки применены!
        </div>
      )}

      <HeaderControls
        isOpen={isSettingsOpen}
        onOpenSettings={openSettings}onCloseSettings={closeSettings}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        theme={theme}
        toggleTheme={toggleTheme}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
      />
      <SettingsPanel isOpen={isSettingsOpen} onClose={closeSettings} theme={theme} onApplySuccess={triggerNotification} />
      <CalendarGrid weekDays={weekDays} shifts={shifts} handleDayClick={handleDayClick} />
      <DayDetails selectedDateInfo={selectedDateInfo} />
      <ShiftLegend shiftColors={shiftColors} />
      {showShiftCount && <NumberOfShifts shiftSummary={shiftSummary} />}
      {showSalary && <SalarySummary shiftSummary={shiftSummary} />}
    </div>
  );
};

export default ShiftsCalendar;