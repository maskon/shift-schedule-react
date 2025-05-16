import { useAppStore } from "../store/useAppStore";
import { loadSettingsFromStorage, saveSettingsToStorage } from "../utils/settingsStorage";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const {
    shiftType, setShiftType,
    showShiftCount, setShowShiftCount,
    showSalary, setShowSalary,
    hourlyRate, setHourlyRate,
    considerHolidays, setConsiderHolidays
  } = useAppStore();

  const [tempShift, setTempShift] = useState(shiftType);
  const [draftShowShiftCount, setDraftShowShiftCount] = useState(showShiftCount);
  const [draftShowSalary, setDraftShowSalary] = useState(showSalary);
  const [draftHourlyRate, setDraftHourlyRate] = useState(hourlyRate.toString());
  const [rateError, setRateError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [draftConsiderHolidays, setDraftConsiderHolidays] = useState(considerHolidays);

  useEffect(() => {
    const { shiftType, showShiftCount, showSalary, hourlyRate, considerHolidays } = loadSettingsFromStorage();
    setShiftType(shiftType);
    setShowShiftCount(showShiftCount);
    setShowSalary(showSalary);
    setHourlyRate(hourlyRate);
    setTempShift(shiftType);
    setDraftShowShiftCount(showShiftCount);
    setDraftShowSalary(showSalary);
    setDraftHourlyRate(hourlyRate.toString());
    setConsiderHolidays(considerHolidays ?? true);
    setDraftConsiderHolidays(considerHolidays ?? true)
  }, [setShiftType, setShowShiftCount, setShowSalary, setHourlyRate, setConsiderHolidays]);

  const applySettings = () => {
    const parsedRate = parseFloat(draftHourlyRate);
    if (draftShowSalary && (isNaN(parsedRate) || parsedRate <= 0)) {
      setRateError("Поле не может быть пустым или отрицательным!");
      return false;
    }

    const normalizedRate = Math.abs(parsedRate);
    setShiftType(tempShift);
    setShowShiftCount(draftShowShiftCount);
    setShowSalary(draftShowSalary);
    setHourlyRate(normalizedRate);
    saveSettingsToStorage({
      shiftType: tempShift,
      showShiftCount: draftShowShiftCount,
      showSalary: draftShowSalary,
      hourlyRate: normalizedRate,
      considerHolidays: draftConsiderHolidays
    });

    setShowNotification(true);
    setConsiderHolidays(draftConsiderHolidays)

    setTimeout(() => setShowNotification(false), 2000);
    return true;
  };

  const isUnchanged =
    tempShift === shiftType &&
    draftShowShiftCount === showShiftCount &&
    draftShowSalary === showSalary &&
    parseFloat(draftHourlyRate) === hourlyRate &&
    draftConsiderHolidays === considerHolidays;

  return {
    tempShift,
    setTempShift,
    draftShowShiftCount,
    setDraftShowShiftCount,
    draftShowSalary,
    setDraftShowSalary,
    draftHourlyRate,
    setDraftHourlyRate,
    rateError,
    setRateError,
    applySettings,
    isUnchanged,
    showNotification,
    draftConsiderHolidays,
    setDraftConsiderHolidays
  };
};