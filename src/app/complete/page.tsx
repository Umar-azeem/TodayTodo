"use client";

import { useTodoStore } from "@/state";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const Completed = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);

  const [isTicking, setIsTicking] = useState<string | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flashTick, setFlashTick] = useState<string | null>(null);

  const formatDateHeading = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const label = isToday
      ? "Today"
      : isYesterday
      ? "Yesterday"
      : date.toLocaleDateString("en-US", { weekday: "long" });

    const formatted = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return `${formatted} · ${label}`;
  };

  /* ---------------- GROUP TASKS BY DATE ---------------- */
  const groupedTasks = useMemo(() => {
    const completed = tasks.filter((t) => t.completed);

    const groups: Record<string, typeof completed> = {};

    completed.forEach((task) => {
      const dateKey = new Date(
        task.createdAt ?? task.dueDate ?? Date.now()
      ).toDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(task);
    });

    return Object.entries(groups).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  }, [tasks]);

  /* ---------------- EMPTY STATE ---------------- */
  if (groupedTasks.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <div className="text-center max-w-md">
          <Image
            src="/compelete.png"
            width={220}
            height={220}
            alt="No activity"
            className="mx-auto"
          />
          <h2 className="mt-4 font-semibold">No activity in the past week</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Completed tasks from all your projects will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-12">Activity: All projects</h1>

        {groupedTasks.map(([dateKey, dateTasks]) => (
          <div key={dateKey} className="mb-4">
            <h4 className="text-sm font-semibold mb-2">
              {formatDateHeading(new Date(dateKey))}
            </h4>
            <hr className="mb-3" />

            {dateTasks.map((task) => (
              <div
                key={task.taskId}
                className="flex items-start justify-between py-3 border-b"
              >
                <div className="flex gap-3">
                  <div className="flex items-end ">
                    <Image
                      src="/umar.jpeg"
                      width={50}
                      height={50}
                      alt="User"
                      className="w-14 h-14 rounded-full"
                    />{" "}
                    <div
                      onClick={() => {
                        setIsTicking(task.taskId);
                        setTimeout(() => {
                          completeTask(task.taskId);
                          setIsTicking(null);
                        }, 400);
                      }}
                      className={`w-3 h-3 -ml-3 text-white md:w-4 md:h-4 border rounded-full cursor-pointer flex items-center justify-center 
                       transition-all duration-500
                       ${task.completed ? "border-green-500 bg-green-500" : "border-gray-500"}
                          ${
                       isTicking === task.taskId
                       ? "bg-red-500 border-red-500 text-white scale-125"
                           : ""
                       }
                      `}
                    >
                      {" "}
                      <svg
                        className={`w-3 h-3 text-white transition-all duration-300 transform 
        ${task.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        ${flashTick === task.taskId ? "tick-flash" : ""}
      `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-black">You</span>{" "}
                      completed a task:{" "}
                      <span className="font-semibold text-black">
                        {task.name}
                      </span>
                    </p>

                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(task.dueDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.taskId)}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded"
                >
                  Delete <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Completed;
