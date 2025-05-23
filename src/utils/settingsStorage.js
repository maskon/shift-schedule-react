export const loadSettingsFromStorage = () => {
  const parseJSON = (key, fallback) => {
    const raw = localStorage.getItem(key);
    try {
      if (raw === null || raw === "undefined") return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  };

  return {
    shiftType: parseInt(localStorage.getItem("shiftType")) || 0,
    showShiftCount: parseJSON("showShiftCount", true),
    showSalary: parseJSON("showSalary", false),
    hourlyRate: Math.abs(Number(localStorage.getItem("hourlyRate") || "0")),
    considerHolidays: parseJSON("considerHolidays", true),
    shifts: parseJSON("shifts", null),
  };
};

export const saveSettingsToStorage = ({ shiftType, showShiftCount, showSalary, hourlyRate, considerHolidays }) => {
  localStorage.setItem("shiftType", shiftType.toString());
  localStorage.setItem("showShiftCount", JSON.stringify(showShiftCount));
  localStorage.setItem("showSalary", JSON.stringify(showSalary));
  localStorage.setItem("hourlyRate", Math.abs(hourlyRate).toString());
  localStorage.setItem("considerHolidays", JSON.stringify(considerHolidays));
};