import { useMemo } from "react";

export interface FormattedDate {
  dayName: string;
  shortMonth: string;
  monthName: string;
  dateNumber: number;
  monthNumber: number;
  year: number;
}
export function useCurrentMonthYear(inputDate: Date | string): FormattedDate {
  return useMemo(() => {
    const dateObj = inputDate instanceof Date ? inputDate : new Date(inputDate);

    if (isNaN(dateObj.getTime())) {
      return {
        dayName: "",
        shortMonth: "",
        monthName: "",
        dateNumber: 0,
        monthNumber: 0,
        year: 0,
      };
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayName = dayNames[dateObj.getDay()];
    const monthName = monthNames[dateObj.getMonth()];
    const shortMonth = monthName.slice(0, 3);
    const dateNumber = dateObj.getDate();
    const monthNumber = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return {
      dayNames,
      dayName,
      shortMonth,
      monthNames,
      monthName,
      dateNumber,
      monthNumber,
      year,
    };
  }, [inputDate]);
}
