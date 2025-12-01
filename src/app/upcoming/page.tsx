"use client";
import { useTodoStore } from "@/state";
import {
  Calendar as CalendarIcon,
  Edit,
  Ellipsis,
  Flag,
  Trash2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCurrentMonthYear,
  FormattedDate,
} from "@/components/useCurrentMonthYear";
import { useMemo, useState } from "react";
import { useCalendarDays, useMonthDayYear } from "@/components/ui/monthDayYear";
function formatDate(inputDate: Date | string): FormattedDate {
  const dateObj = inputDate instanceof Date ? inputDate : new Date(inputDate);
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
  return { dayName, shortMonth, monthName, dateNumber, monthNumber, year };
}
function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
const Upcoming = ({ date }: { date: Date }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const tasks = useTodoStore((state) => state.tasks);
  const monthYear = useCurrentMonthYear(date);
  const { title, daysArray } = useCalendarDays(10);

  const grouped = useMemo(() => {
    return tasks.reduce((acc: any, task: any) => {
      const key = new Date(task.dueDate).toDateString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);
  const dates = useMemo(() => {
    return Object.keys(grouped)
      .map((d) => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [grouped]);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  function getLabel(d: Date) {
    if (isSameDay(d, today)) return "Today";
    if (isSameDay(d, tomorrow)) return "Tomorrow";
    return "";
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-3xl">
        <div>
          <div className="mb-4">
            <h1 className="text-xl font-semibold ">Upcoming</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 text-xs  rounded-md">
                {title}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2">
                <Calendar mode="single" />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-row border-b">
            {daysArray.map((item, i) => (
              <div
                key={i}
                className={`flex flex-row w-full font-semibold p-1 rounded-md text-center justify-center items-center cursor-pointer 
        ${selectedDay === i ? "bg-gray-100" : "bg-white"}`}
                onClick={() => setSelectedDay(i)}
              >
                <p className="">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {dates.map((dateObj) => {
          const label = getLabel(dateObj);
          const tasksForDate = grouped[dateObj.toDateString()];
          const dateInfo = formatDate(dateObj);
          return (
            <div key={dateObj.toISOString()} className="mb-6">
              <h2 className="font-semibold flex gap-2">
                {dateInfo.dateNumber} {dateInfo.shortMonth} ·{" "}
                {label && `${label} ·`} {dateInfo.dayName}
              </h2>
              <div className="mt-2 space-y-2">
                {tasksForDate.map((task: any) => (
                  <div
                    key={task.taskId}
                    className="flex items-center justify-between border-b p-3 rounded bg-card"
                  >
                    <span>{task.name}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 border rounded-md">
                        <Edit size={16} />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1 border rounded-md">
                          <CalendarIcon size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2">
                          <Calendar mode="single" />
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <button className="p-1 border rounded-md">
                        <Flag size={16} />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1 border rounded-md">
                          <Ellipsis size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <button className="p-2 flex gap-2 w-full">
                              <Trash2 size={16} /> Delete
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button className="p-2 flex gap-2 w-full">
                              <Edit size={16} /> Edit
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-red-500 m-2 text-sm ">
                <span>+</span> Add task
              </button>
              {/* <Button onClick={() => { 
                handleAddTask();
                handleTaskInput();}}
               className="bg-red-500 hover:bg-red-600 text-white">
                        Add task
                     </Button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Upcoming;
