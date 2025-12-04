"use client";
import { useTodoStore } from "@/state";
import {
  Calendar as CalendarIcon,
  CircleCheck,
  Edit,
  Flag,
  Trash2,
} from "lucide-react";
import PopUp from "@/components/popUp";
import { useMemo, useState } from "react";

function formatDate(inputDate: Date) {
  return {
    dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      inputDate.getDay()
    ],
    shortMonth: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][inputDate.getMonth()],
    dateNumber: inputDate.getDate(),
  };
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getNextNDays(n: number) {
  const arr: Date[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    arr.push(d);
  }
  return arr;
}

const Upcoming = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask );
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [selectDate,setSelectDate] =useState<string | null>(null)
  const grouped = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tasks.reduce((acc: Record<string, any[]>, task) => {
      const key = new Date(task.dueDate).toDateString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  const dates = useMemo(() => getNextNDays(30), []);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const getLabel = (dateObj: Date) => {
    if (isSameDay(dateObj, today)) return "Today";
    if (isSameDay(dateObj, tomorrow)) return "Tomorrow";
    return "";
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-xl font-semibold mb-4">Upcoming</h1>
        <div className="flex gap-4 overflow-x-auto  border-b mb-6">
          {dates.map((dateObj) => {
            const dateInfo = formatDate(dateObj);
            return (
              <div
                key={dateObj.toDateString()}
                className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center  p-2 cursor-pointer `}
                 onClick={() => setSelectDate(dateObj.toDateString())}
              >
                <div className="flex text-xs justify-center items-center text-center gap-2">
                  <span className="">{dateInfo.dayName}</span>
                  <span
                    className={` bg-red-200 p-1 rounded-sm  ${
                      selectDate === dateObj.toDateString()
                        ? "bg-red-500 text-white"
                        : "bg-white "
                    }`}
                  >
                    {dateInfo.dateNumber}
                  </span>
                </div>
                {/* <span className="text-xs text-gray-500">{dateInfo.shortMonth}</span> */}
                {/* {label && <span className="text-xs text-red-500">{label}</span>} */}
              </div>
            );
          })}
        </div>

        {dates.map((dateObj) => {
          const dateKey = dateObj.toDateString();
          const tasksForDate = grouped[dateKey] || [];
          const label = getLabel(dateObj);
          const dateInfo = formatDate(dateObj);

          return (
            <div key={dateKey} className="mb-6">
              <h2 className="font-semibold flex gap-2">
                {dateInfo.dateNumber} {dateInfo.shortMonth} ·{" "}
                {label ? `${label} ·` : ""} {dateInfo.dayName}
              </h2>

              <div className="mt-2 space-y-2">
                {tasksForDate.map((task) => (
                  <div
                    key={task.taskId}
                    className="flex items-center justify-between border-b p-3 rounded bg-card"
                  >
                    <div className="flex items-center gap-2">
                      <CircleCheck
                        onClick={() => completeTask(task.taskId)}
                        className={`cursor-pointer w-4 h-4 ${
                          task.completed ? "text-green-500" : ""
                        }`}
                      />
                      <span className={task.completed ? "line-through" : ""}>
                        {task.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="p-1 border rounded-md">
                        <Edit size={16} />
                      </button>

                      <button className="p-1 border rounded-md">
                        <Flag size={16} />
                      </button>

                      <button
                        onClick={() => deleteTask(task.taskId)}
                        className="p-1 border rounded-md text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {activeDate === dateKey && (
                <PopUp
                  selectedDate={dateObj}
                  handleClose={() => setActiveDate(null)}
                />
              )}

              <button
                onClick={() => setActiveDate(dateKey)}
                className="text-red-500 mt-2 "
              >
                + Add task
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Upcoming;
