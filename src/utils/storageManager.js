import { calculateShift } from "./shiftCalculations";
import { shiftColors } from './shiftConfig';

// Генерация ключа для хранения
const getStorageKey = (shiftType, year, month) => 
  `shiftCalendar_${shiftType}_${year}-${String(month).padStart(2, '0')}`;

// storageManager.js
export const loadShifts = (shiftType, year, month) => {
  const key = `shiftCalendar_${shiftType}_${year}-${String(month).padStart(2, '0')}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveShifts = (shiftType, year, month, shifts) => {
  const key = `shiftCalendar_${shiftType}_${year}-${String(month).padStart(2, '0')}`;
  localStorage.setItem(key, JSON.stringify(shifts));
};

// Генерация и сохранение начальных данных
export const initializeShifts = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Генерируем данные на 6 месяцев назад и 12 вперед
  for (let i = -6; i <= 12; i++) {
    const date = new Date(currentYear, currentMonth + i);
    const year = date.getFullYear();
    const month = date.getMonth();

    for (let shiftType = 0; shiftType < 4; shiftType++) {
      const key = getStorageKey(shiftType, year, month);
      if (!localStorage.getItem(key)) {
        const shifts = generateBaseShifts(shiftType, year, month);
        localStorage.setItem(key, JSON.stringify(shifts));
      }
    }
  }
};

// Вспомогательная функция генерации
const generateBaseShifts = (shiftType, year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  // Заполняем пустые дни в начале
  for (let i = 0; i < offset; i++) {
    days.push({ day: null, color: "bg-transparent", name: "Пусто", icon: null });
  }

  // Основные дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const shiftIndex = calculateShift(date, shiftType);
    const shift = shiftIndex === -1
      ? { color: "bg-transparent", name: "Выходной", icon: null }
      : shiftColors[shiftIndex];
    
    days.push({ day, ...shift });
  }

  // Пустые дни в конце
  const remainingCells = (7 - ((offset + daysInMonth) % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, color: "bg-transparent", name: "Пусто", icon: null });
  }

  return days;
};