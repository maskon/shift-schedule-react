export const shiftColors = [
  { color: "bg-green-100 dark:bg-green-800", name: "1 смена", icon: 'FiSun' },
  { color: "bg-cyan-200 dark:bg-cyan-800", name: "2 смена", icon: 'FiUsers' },
  { color: "bg-gray-400 dark:bg-gray-700", name: "3 смена", icon: 'FiMoon' },
  { color: "bg-transparent", name: "Выходной", icon: 'FiCoffee' },
];

export const baseDates = [
  new Date(2022, 12, 11),
  new Date(2022, 12, 14),
  new Date(2022, 12, 17),
  new Date(2022, 12, 20)
];

// список праздников в формате YYYY-MM-DD
export const generateHolidayDates = (year) => {
    return [
        `${year}-01-01`, `${year}-01-07`, `${year}-02-23`, `${year}-03-08`,
        `${year}-05-01`, `${year}-05-09`, `${year}-06-12`, `${year}-11-04`, `${year}-12-31`
    ];
};

export const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];