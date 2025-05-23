import { calculateShift } from "./shiftCalculations";
import { loadShifts } from "./storageManager"; // Изменяем импорт
import { shiftColors } from "./shiftConfig";

export const generateShiftsForMonth = ({ month, year, shiftType }) => {
  // Заменяем loadShiftOverrides на loadShifts
  const savedShifts = loadShifts(shiftType, year, month);
  if (savedShifts) return savedShifts;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = Array(offset).fill({ 
    day: null, 
    color: "bg-transparent", 
    name: "Пусто", 
    icon: null 
  });

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const shiftIndex = calculateShift(currentDate, shiftType);
    const shift = shiftIndex === -1
      ? { color: "bg-transparent", name: "Выходной", icon: null }
      : shiftColors[shiftIndex];
    days.push({ day, ...shift });
  }

  const remainingCells = (7 - ((offset + daysInMonth) % 7)) % 7;
  return days.concat(
    Array(remainingCells).fill({ 
      day: null, 
      color: "bg-transparent", 
      name: "Пусто", 
      icon: null 
    })
  );
};