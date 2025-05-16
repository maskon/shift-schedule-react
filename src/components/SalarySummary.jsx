import React from "react";
import { useAppStore } from "../store/useAppStore";

const SalarySummary = ({ shiftSummary }) => {
  const hourlyRate = useAppStore((state) => state.hourlyRate);

  const perShiftBonus = 40;

  const { total, night, holidayDayHours = 0, holidayNightHours = 0 } = shiftSummary;

  const dayShiftSalary = hourlyRate * 8 * total;
  const nightShiftBonus = hourlyRate * 8 * night * 0.4;

  const holidayDayPay = hourlyRate * holidayDayHours;             // 2x тариф
  const holidayNightPay = hourlyRate * holidayNightHours * 1.4;   // 2x + 40%

  const shiftsBonus = total * perShiftBonus;

  const totalSalaryBeforeTax =
    dayShiftSalary + nightShiftBonus + holidayDayPay + holidayNightPay + shiftsBonus;

  const tax = totalSalaryBeforeTax * 0.13;
  const totalSalary = totalSalaryBeforeTax - tax;

  return (
    <div className="mt-4 bg-green-100 text-green-800 p-4 rounded shadow">
      Заработная плата: {totalSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₽
    </div>
  );
};

export default SalarySummary;