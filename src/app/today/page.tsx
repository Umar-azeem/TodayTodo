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
import { useState } from "react";
import TaskDetails from "@/components/TaskDetails";
import PopUp from "@/components/popUp";
import { usePopUpLogic } from "@/components/usePopUpLogic";
const Today = () => {
  const {
    editPopUp,
    editTaskId,
    setEditPopUp,
    setEditTaskId,
    openEditPopup,
    saveEditPopup,
  } = usePopUpLogic();
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const [flashTick, setFlashTick] = useState<string | null>(null);
  const [showTask, setShowTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleShowTask = (taskId?: string) => {
    if (taskId) setSelectedTaskId(taskId);
    setShowTask(true);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const filteredTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });
  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);
  // console.log(filteredTasks)
  return (
    <>
    
      <div className="w-full flex flex-col max-w-3xl mx-auto py-10  ">
        <h1 className="text-lg font-bold mb-1">Today</h1>
        <p className="text-sm text-gray-500 mb-2">
          {filteredTasks.length} task
        </p>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-2 w-full">
            <p className="text-muted-foreground mt-3">
              No tasks yet. Add one to get started!
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <>
              <div key={task.taskId}>
                <div className="group relative grid grid-cols-6 items-start border-b border-gray-200 py-3">
                  <div className="flex items-start gap-3 col-span-2">
                    <div
                      onClick={() => {
                        completeTask(task.taskId);
                        setFlashTick(task.taskId);
                        setTimeout(() => setFlashTick(null), 80);
                        setShowPopup(true);
                        setTimeout(() => setShowPopup(false), 1500);
                      }}
                      className={`w-4 h-4 border ${
                        task.completed
                          ? "border-red-500 bg-red-500"
                          : "border-gray-500"
                      } rounded-full cursor-pointer flex items-center justify-center`}
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
                    <p
                      // onClick={() => openEditPopup(task)}
                      className={`text-sm cursor-pointer ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {task.name}
                    </p>
                  </div>
                  <div
                    onClick={() => handleShowTask(task.taskId)}
                    className="col-span-3 w-full h-full cursor-pointer"
                  ></div>
                  <div className="col-span-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity relative  justify-end items-center gap-1 text-gray-500">
                    <button
                      className="p-1 border rounded-md"
                      onClick={() => openEditPopup(task.taskId)}
                    >
                      <Edit size={16} />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1  rounded-md border">
                        <CalendarIcon size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-2 ">
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
                              openEditPopup(task.taskId);
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
                {editPopUp && editTaskId === task.taskId && (
                  <div className="absolute z-20 w-full">
                    <PopUp
                      selectedDate={selectedDate}
                      handleClose={() => setEditPopUp(false)}
                      handleTaskInput={saveEditPopup}
                    />
                  </div>
                )}
              </div>
            </>
          ))
        )}
        <button className="text-red-500 flex items-center gap-2 text-sm mt-3">
          <span className="text-xl">+</span> Add task
        </button>
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
    </>
  );
};

export default Today;
