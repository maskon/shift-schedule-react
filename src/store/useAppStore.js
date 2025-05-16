import { create } from 'zustand';

const getDefaultTheme = () =>
  localStorage.getItem("theme") || "light";

export const useAppStore = create((set) => ({
  // Тема
  theme: getDefaultTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),  
  
  // Дата
  selectedMonth: null,
  selectedYear: null,
  baseDate: new Date(2023, 0, 11),
  setBaseDate: (date) => set({ baseDate: date }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  
  // Тип смены
  shiftType: 0,
  setShiftType: (type) => set({ shiftType: type }),
  
  // Кол-во смен
  showShiftCount: localStorage.getItem("showShiftCount") === "true",
  setShowShiftCount: (value) => set({ showShiftCount: value }),
  
  // ЗП
  showSalary: false,
  setShowSalary: (value) => set({ showSalary: value }),
  
  hourlyRate: 0,
  setHourlyRate: (value) => set({ hourlyRate: value }),
  
  // Смены
  shifts: [],
  setShifts: (shifts) => set({ shifts }),
  
  // Праздничные смены
  considerHolidays: true,
  setConsiderHolidays: (value) => set({ considerHolidays: value }),
}));