import { baseDates } from "./shiftConfig";

// Функция расчета смены
export function calculateShift(date, shiftType = 0) {
  const baseDate = baseDates[shiftType];
  const dayDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const cycle = [
    { shift: 0, days: 3 },  // 1 смена
    { shift: -1, days: 1 }, // Выходной
    { shift: 2, days: 3 },  // 3 смена
    { shift: -1, days: 1 }, // Выходной
    { shift: 1, days: 3 },  // 2 смена
    { shift: -1, days: 1 }  // Выходной
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

  return shiftIndex;
}