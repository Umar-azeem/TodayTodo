"use client";

import { useTodoStore } from "@/state";
import { CircleCheck, Trash2 } from "lucide-react";
import PopUp from "@/components/popUp";
import { useEffect, useMemo, useRef, useState } from "react";

function formatDate(d: Date) {
  return {
    dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()],
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
    ][d.getMonth()],
    dateNumber: d.getDate(),
  };
}

function getNextNDays(n: number) {
  const out: Date[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export default function Upcoming() {
  const tasks = useTodoStore((s) => s.tasks);
  const deleteTask = useTodoStore((s) => s.deleteTask);
  const completeTask = useTodoStore((s) => s.completeTask);

  const dates = useMemo(() => getNextNDays(30), []);
  const todayKey = new Date().toDateString();

  const [activeDate, setActiveDate] = useState<string>(todayKey);
  const [popupDate, setPopupDate] = useState<string | null>(null);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const headerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const grouped = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tasks.reduce((acc: Record<string, any[]>, task) => {
      const key = new Date(task.dueDate).toDateString();
      acc[key] ??= [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.getAttribute("data-date");
            if (key) setActiveDate(key);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    headerRefs.current[activeDate]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeDate]);

  const activeIndex = dates.findIndex((d) => d.toDateString() === activeDate);

  const visibleDates = dates.slice(
    Math.max(activeIndex - 3, 0),
    activeIndex + 4
  );

  return (
    <div className="w-full flex justify-center p-4 h-screen">
      <div className="w-full max-w-3xl overflow-hidden">
        <div className="fixed flex flex-col items-center justify-center top-10 z-10 w-full max-w-3xl bg-white border-b">
          <div className="flex w-full text-start items-start justify-start">
            <h1 className="text-xl font-bold ">Upcoming</h1>
          </div>
          <div className="flex gap-10 overflow-x-auto w-full px-2">
            {visibleDates.map((d) => {
              const key = d.toDateString();
              const f = formatDate(d);

              return (
                <div
                  key={key}
                  ref={(el: HTMLDivElement | null) => {
                    headerRefs.current[key] = el;
                  }}
                  onClick={() => {
                    setActiveDate(key);
                    sectionRefs.current[key]?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="flex-shrink-0 w-16 h-20
                             flex flex-row gap-3 items-center justify-center
                             cursor-pointer"
                >
                  <span className="text-xs">{f.dayName}</span>
                  <span
                    className={`p-1 rounded-sm text-xs ${
                      activeDate === key
                        ? "bg-red-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {f.dateNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-28 h-[calc(100vh-150px)] overflow-y-auto pr-2">
          {dates.map((d) => {
            const key = d.toDateString();
            const f = formatDate(d);
            const tasksForDate = grouped[key] || [];

            return (
              <div
                key={key}
                data-date={key}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current[key] = el;
                }}
                className="mb-6 scroll-mt-28"
              >
                <h2 className="font-semibold mb-2">
                  {f.dateNumber} {f.shortMonth} · {f.dayName}
                </h2>

                <div className="space-y-2">
                  {tasksForDate.map((task) => (
                    <div
                      key={task.taskId}
                      className="flex items-center justify-between
                                 border p-3 rounded bg-card"
                    >
                      <div className="flex items-center gap-2">
                        <CircleCheck
                          onClick={() => completeTask(task.taskId)}
                          className={`w-4 h-4 cursor-pointer ${
                            task.completed ? "text-green-500" : ""
                          }`}
                        />
                        <span className={task.completed ? "line-through" : ""}>
                          {task.name}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTask(task.taskId)}
                        className="p-1 border rounded text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {popupDate === key && (
                  <PopUp
                    selectedDate={d}
                    handleClose={() => setPopupDate(null)}
                  />
                )}

                <button
                  onClick={() => setPopupDate(key)}
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
}
