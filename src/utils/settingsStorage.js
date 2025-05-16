export const loadSettingsFromStorage = () => {
  return {
    shiftType: parseInt(localStorage.getItem("shiftType")) || 0,
    showShiftCount: JSON.parse(localStorage.getItem("showShiftCount") || "true"),
    showSalary: JSON.parse(localStorage.getItem("showSalary") || "false"),
    hourlyRate: Math.abs(Number(localStorage.getItem("hourlyRate") || "0")),
    considerHolidays: JSON.parse(localStorage.getItem("considerHolidays") || true)
  };
};

export const saveSettingsToStorage = ({ shiftType, showShiftCount, showSalary, hourlyRate, considerHolidays }) => {
  localStorage.setItem("shiftType", shiftType.toString());
  localStorage.setItem("showShiftCount", JSON.stringify(showShiftCount));
  localStorage.setItem("showSalary", JSON.stringify(showSalary));
  localStorage.setItem("hourlyRate", Math.abs(hourlyRate).toString());
  localStorage.setItem("considerHolidays", JSON.stringify(considerHolidays));
};