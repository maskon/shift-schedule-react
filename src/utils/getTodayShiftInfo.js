import { calculateShift } from "./shiftUtils";

export const getTodayShiftInfo = (year, month, shiftType) => {
  const today = new Date();
  if (month === today.getMonth() && year === today.getFullYear()) {
    const shift = calculateShift(today, shiftType);
    return {
      date: today.toLocaleDateString("ru-RU"),
      shift: shift.name,
      color: shift.color,
      icon: shift.icon,
    };
  }
  return null;
};