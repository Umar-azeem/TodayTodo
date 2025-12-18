/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTodoStore } from "@/state";
import { Calendar as CalendarIcon, Edit, Ellipsis, Plus, Trash2 } from "lucide-react";
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
import Image from "next/image";

const Today = () => {
  const { editPopUp, setEditPopUp, setEditTaskId } = usePopUpLogic();
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const updateTask = useTodoStore((state) => state.updateTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const [flashTick, setFlashTick] = useState<string | null>(null);
  const [showTask, setShowTask] = useState(false);
  const [isTicking, setIsTicking] = useState<string | number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editTodoData, setEditTodoData] = useState({});
  // const [addTaskOpenTodo, setAddTaskOpenTodo] = useState(false);
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
  const editPopUpFn = (obj: any) => {
    setEditTodoData(obj);
    setEditPopUp(true);
  };
  // const toggleAddTask = () => setAddTaskOpenTodo((prev) => !prev);
  // console.log(filteredTasks)
  return (
    <>
      <div className="relative w-full h-screen flex">
        <div className="w-full flex flex-col max-w-3xl mx-auto py-10  ">
          <h1 className="text-sm md:text-2xl font-bold mb:0.5 md:mb-1">
            Today
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            {filteredTasks.length} task
          </p>
          {filteredTasks.length === 0 ? (
            <>
              
              <div className="flex flex-col items-center justify-center text-center py-0.5 md:py-2 w-full">
                <Image
                  width={200}
                  height={200}
                  src="/taday1.png"
                  alt="Umar"
                  className="w-64 h-46 rounded-full"
                />
                <h1>Welcome to your Today view</h1>
                <p className="text-muted-foreground mt-3">
                  See everything due today across all your projects.{" "}
                </p>

<button
              className="flex items-center justify-between p-1  rounded-md hover:bg-gray-100"
            >
                <Plus className="w-5 h-5 bg-[#D33327] text-white rounded-full p-0.5" />
                <p className="text-sm font-medium text-[#A81F00]">Add task</p>

            </button>

              </div>
            
            </>
          ) : (
            filteredTasks.map((task) => (
              <>
                <div key={task.taskId}>
                  <div className="group relative grid grid-cols-6 items-start border-b border-gray-200  md:py-3  py-0.5 ">
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

                    <div
                      onClick={() => handleShowTask(task.taskId)}
                      className="col-span-3 w-full h-full cursor-pointer"
                    ></div>
                    <div className="col-span-1 flex  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity relative  justify-end items-center gap-1 text-gray-500">
                      <button
                        className="p-1 border hidden md:flex  rounded-md"
                        onClick={() => {
                          // openEditPopup(task);
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
                          <Calendar
                            mode="single"
                            selected={
                              task.dueDate ? new Date(task.dueDate) : undefined
                            }
                            onSelect={(date) => {
                              if (!date) return;

                              updateTask(task.taskId, {
                                dueDate: date.toISOString(),
                              });

                              console.log("UPDATED DATE:", date.toISOString());
                            }}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* <button className="p-1 border rounded-md hidden md:flex ">
                        <Flag size={16} />
                      </button> */}
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
                                // openEditPopup(task);
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
              </>
            ))
          )}

          {/* <button
            onClick={handleTaskOpen}
            className="text-red-500 flex items-center gap-2 text-sm mt-3"
          >
            <span className="text-xl">+</span> Add task 
          </button> */}
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

        {editPopUp && (
          <div className="absolute z-50 flex justify-center items-center h-screen w-full">
            <div className="w-full max-w-3xl">
              <PopUp
                // selectedDate={selectedDate || undefined}
                handleClose={() => setEditPopUp(false)}
                editTodoData={editTodoData}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Today;
