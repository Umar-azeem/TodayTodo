"use client";
import { useTodoStore } from "@/state";

import {
  DropdownMenu,
  
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Trash2 } from "lucide-react";
const Completed = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const filteredTasks = tasks.filter((task) => task.completed === true);
const [isTicking, setIsTicking] = useState<string | number | null>(null);
  const [flashTick, setFlashTick] = useState<string | null>(null);

  return (
    <div className="flex w-full justify-center my-8">
      <p className="text-xl font-semibold">Completed</p>
      <div className="flex flex-row w-full max-w-3xl my-10">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 w-full">
            <p className="text-muted-foreground mt-3">
              No completed tasks yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {filteredTasks.map((task) => (
              <div
                key={task.taskId}
                className="flex border-b border-gray-200 items-center justify-between p-3 bg-card rounded-md"
              >
                {task.completed && (
                  <div className="flex items-start gap-3 col-span-2">
                    <div
                      onClick={() => {
                        // 1. Start tick animation (even on unmark)
                        setFlashTick(task.taskId);
                        setIsTicking(task.taskId);
                        setTimeout(() => setFlashTick(null), 300);
                        setTimeout(() => {
                          completeTask(task.taskId); 
                          setIsTicking(null); 
                        }, 500); 
                      }}
                      className={`w-3 h-3 md:w-4 md:h-4 border rounded-full cursor-pointer flex items-center justify-center 
        transition-all duration-500
        ${task.completed ? "border-red-500 bg-red-500" : "border-gray-500"}
        ${
          isTicking === task.taskId
            ? "bg-red-500 border-red-500 text-white scale-125"
            : ""
        }
      `}
                    >
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

                    <div>
                      <p className="text-xs md:text-sm line-through text-gray-400">
                        {task.name}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  {/* <button className="p-1 border rounded-md">
                    <Edit size={16} />
                  </button> */}
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 border rounded-md">
                      <CalendarIcon size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                      <Calendar mode="single" />
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  {/* <button className="p-1 border rounded-md">
                    <Flag size={16} />
                  </button> */}
                
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 border rounded-md">
                      {/* <Ellipsis size={16} /> */}
                      <button
                          onClick={() => deleteTask(task.taskId)}
                          className="p-2 flex gap-2 w-full"
                        >
                          <Trash2 size={16} /> 
                        </button>
                    </DropdownMenuTrigger>
                    
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;
