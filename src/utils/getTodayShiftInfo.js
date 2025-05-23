import { calculateShift } from "./shiftCalculations"; // Импортируем напрямую из shiftCalculations
import { shiftColors } from "./shiftConfig";

export function getTodayShiftInfo(year, month, shiftType) {
  const today = new Date();
  if (today.getFullYear() !== year || today.getMonth() !== month) {
    return null;
  }

  const shiftIndex = calculateShift(today, shiftType);
  const shift = shiftIndex === -1 
    ? { color: "bg-transparent", name: "Выходной", icon: null }
    : shiftColors[shiftIndex];

  return {
    date: today.toLocaleDateString("ru-RU"),
    shift: shift.name,
    color: shift.color,
    icon: shift.icon
  };
}