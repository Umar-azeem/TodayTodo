"use client";

import { useProjectStore, useTodoStore } from "@/state";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  Edit,
  Ellipsis,
  Trash2,
  
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import TaskDetails from "@/components/TaskDetails";
import { usePopUpLogic } from "@/components/usePopUpLogic";

export default function ProjectPage() {
    const { setEditTaskId,setEditPopUp } = usePopUpLogic();
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const [flashTick, setFlashTick] = useState<string | null>(null);
  const [showTask, setShowTask] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isTicking, setIsTicking] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const projectTasks = tasks.filter((task) => task.projectId === projectId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editTodoData, setEditTodoData] = useState({});
    
  const handleShowTask = (taskId?: string) => {
    if (taskId) setSelectedTaskId(taskId);
    setShowTask(true);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = projectTasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate.getTime() === today.getTime();
  });
  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);

  const project = projects.find((p) => p.id === projectId);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const editPopUpFn = (obj: any) => {
    setEditTodoData(obj);
    setEditPopUp(true);
  };
  if (!project) {
    return <div className="p-4 text-red-500">Project not found.</div>;
  }
  return (
    <div className="flex w-full justify-center my-8">
      <div className="flex flex-col w-full max-w-3xl">
        <p className="text-xl font-semibold text-start mb-6">{project.name}</p>
        {todayTasks.length === 0 ? (
          <div className="text-center py-8 w-full">
            <p className="text-muted-foreground mt-3">
              No tasks inside this project for today.
            </p>
          </div>
        ) : (
          <div>
            {todayTasks.map((task) => (
              <div key={task.taskId}>
                <div className="group relative grid grid-cols-6 items-start border-b border-gray-200 md:py-3 py-1">
                  {/* ✅ LEFT: Tick + Task name */}
                  <div className="flex items-start gap-3 col-span-2">
                    <div
                      onClick={() => {
                        setFlashTick(task.taskId);
                        setIsTicking(task.taskId);

                        setTimeout(() => setFlashTick(null), 300);

                        setShowPopup(true);
                        setTimeout(() => setShowPopup(false), 700);

                        setTimeout(() => {
                          completeTask(task.taskId);
                          setIsTicking(null);
                        }, 900);
                      }}
                      className={`w-3 h-3 md:w-4 md:h-4 border rounded-full cursor-pointer 
              flex items-center justify-center transition-all duration-500
              ${
                task.completed ? "border-red-500 bg-red-500" : "border-gray-500"
              }
              ${
                isTicking === task.taskId
                  ? "bg-red-500 border-red-500 text-white scale-125"
                  : ""
              }
            `}
                    >
                      <svg
                        className={`w-3 h-3 text-white transition-all duration-300 transform 
                ${
                  task.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }
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

                    <p
                      className={`text-xs md:text-sm cursor-pointer ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {task.name}
                    </p>
                  </div>

                  {/* ✅ MIDDLE: click area (open task details) */}
                  <div
                    onClick={() => handleShowTask(task.taskId)}
                    className="col-span-3 w-full h-full cursor-pointer"
                  />

                  {/* ✅ RIGHT: actions (hover only) */}
                  <div
                    className="col-span-1 flex invisible opacity-0 
          group-hover:visible group-hover:opacity-100 transition-opacity 
          justify-end items-center gap-1 text-gray-500"
                  >
                    <button
                      className="p-1 border hidden md:flex rounded-md"
                      onClick={() => {
                        editPopUpFn(task);
                        setEditTaskId(task.taskId);
                      }}
                    >
                      <Edit size={16} />
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 hidden md:flex rounded-md border">
                        <CalendarIcon size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-2">
                        <Calendar mode="single" />
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 border rounded-md">
                        <Ellipsis size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <button
                            onClick={() => deleteTask(task.taskId)}
                            className="p-2 flex gap-2 text-sm w-full"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => {
                              editPopUpFn(task);
                              setEditTaskId(task.taskId);
                            }}
                            className="p-2 flex gap-2 text-sm w-full"
                          >
                            <Edit size={16} /> Edit
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showTask && selectedTask && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex justify-end">
          <div className="w-full max-w-md h-full bg-white shadow-xl p-6 relative animate-slideLeft">
            <TaskDetails
              task={selectedTask}
              handleShowTask={() => setShowTask(false)}
            />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-8 py-2 rounded-lg shadow-lg animate-slide-up">
          Task Completed
        </div>
      )}
    </div>
  );
}
