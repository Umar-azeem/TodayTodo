import { useMemo } from "react";

export function useCalendarDays(totalDays: number) {
  return useMemo(() => {
    const now = new Date();

    const monthName = now.toLocaleString("default", { month: "long" }); 
    const year = now.getFullYear(); 

    const title = `${monthName} ${year}`;

    const shortMonth = now.toLocaleString("default", { month: "short" });

    const daysArray = Array.from({ length: totalDays }, (_, index) => {
      return `${shortMonth} ${index + 1}`; 
    });

    return {
      title,
      daysArray,
    };
  }, [totalDays]);
}
