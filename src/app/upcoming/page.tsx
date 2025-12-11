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

import { useInView } from "react-intersection-observer"; // ⭐ ADD THIS
import { useMemo, useState, useRef } from "react";

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
  const completeTask = useTodoStore((state) => state.completeTask);
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const dates = useMemo(() => getNextNDays(30), []);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return tasks.reduce((acc: Record<string, any[]>, task) => {
      const key = new Date(task.dueDate).toDateString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const getLabel = (dateObj: Date) => {
    if (isSameDay(dateObj, today)) return "Today";
    if (isSameDay(dateObj, tomorrow)) return "Tomorrow";
    return "";
  };

  const handleDateClick = (dateKey: string) => {
    setSelectDate(dateKey);
    const element = sectionRefs.current[dateKey];
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full flex justify-center p-4 h-screen">
      <div className="w-full max-w-3xl overflow-hidden">
        <h1 className="text-xl font-semibold ">Upcoming</h1>

        <div className="fixed items-center justify-center w-full max-w-3xl  bg-white flex gap-4 border-b   overflow-hidden">
          {dates.map((dateObj) => {
            const dateKey = dateObj.toDateString();
            const dateInfo = formatDate(dateObj);

            return (
              <>
              <div
                key={dateKey}
                className="flex-shrink-0 w-16 h-20 flex flex-row gap-2 items-center justify-center cursor-pointer "
                onClick={() => handleDateClick(dateKey)}
              >
                <span className="text-xs">{dateInfo.dayName}</span>

                <span
                  className={`p-1 rounded-sm text-xs ${
                    selectDate === dateKey
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {dateInfo.dateNumber}
                </span>
              </div>
              </>
            );
          })}
        </div>

        <div className="mt-24 h-[calc(100vh-120px)] overflow-y-auto pr-2">
          {dates.map((dateObj) => {
            const dateKey = dateObj.toDateString();
            const tasksForDate = grouped[dateKey] || [];
            const dateInfo = formatDate(dateObj);
            const label = getLabel(dateObj);

            const { ref } = useInView({
              threshold: 0.2,
              onChange: (inView) => {
                if (inView) setSelectDate(dateKey);
              },
            });

            return (
              <div
                key={dateKey}
                ref={(el) => {
                  sectionRefs.current[dateKey] = el;
                  ref(el);
                }}
                className="mb-6  scroll-mt-20"
              >
                <h2 className="font-semibold flex gap-2">
                  {dateInfo.dateNumber} {dateInfo.shortMonth} ·{" "}
                  {label ? `${label} · ` : ""} {dateInfo.dayName}
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
                  className="text-red-500 mt-2"
                >
                  + Add task
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
