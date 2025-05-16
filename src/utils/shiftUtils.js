import { baseDates, shiftColors } from "./shiftConfig";

export const calculateShift = (date, shiftType = 0) => {
  const baseDate = baseDates[shiftType];
  const dayDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const cycle = [
    { shift: 0, days: 3 },
    { shift: -1, days: 1 },
    { shift: 2, days: 3 },
    { shift: -1, days: 1 },
    { shift: 1, days: 3 },
    { shift: -1, days: 1 },
  ];
  const totalCycleLength = cycle.reduce((sum, c) => sum + c.days, 0);

  const getShiftForIndex = (index) => {
    let count = 0;
    for (const entry of cycle) {
      if (index < count + entry.days) return entry.shift;
      count += entry.days;
    }
    return -1;
  };

  let shiftIndex;
  if (dayDiff >= 0) {
    const indexInCycle = dayDiff % totalCycleLength;
    shiftIndex = getShiftForIndex(indexInCycle);
  } else {
    const absDiff = Math.abs(dayDiff + 1);
    const indexInCycle = (totalCycleLength - (absDiff % totalCycleLength)) % totalCycleLength;
    shiftIndex = getShiftForIndex(indexInCycle);
  }

  if (shiftIndex === -1) return { color: "bg-transparent", name: "Выходной", icon: null };
  return { ...shiftColors[shiftIndex] };
};

export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const generateShiftsForMonth = ({ month, year, shiftType }) => {
  if (month === null || year === null) return [];

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  for (let i = 0; i < offset; i++) {
    days.push({ day: null, color: "bg-transparent", index: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const shift = calculateShift(currentDate, shiftType);
    days.push({ day, ...shift });
  }

  const totalCells = offset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;

  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, color: "bg-transparent", index: null });
  }

  return days;
};