/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useProjectStore, useTodoStore } from "@/state";
import {
  Calendar as CalendarIcon,
  Edit,
  Ellipsis,
  Plus,
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
import { usePopUpLogic } from "@/components/usePopUpLogic";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
} from "@radix-ui/react-select";
import Icon from "../../../public/icon/icons";
import { format, isToday, isTomorrow, isYesterday, isThisWeek } from "date-fns";
import { Popover } from "@radix-ui/react-popover";
import Popovers from "../../components/popover";

import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
const Inbox = () => {
  // editPopUp, setEditPopUp,
  const { setEditTaskId } = usePopUpLogic();
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

  function friendlyDateLabel(date: Date) {
    if (!date) return "No date";

    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";

    if (isThisWeek(date)) {
      //  (Monday, Tuesday...)
      return format(date, "EEEE");
    }
    return format(date, "MMM d, yyyy");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const filteredTasks = tasks.filter((task) => {
    if (task.completed === true) return false;
    if (!task.dueDate) return true;

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate.getTime() === today.getTime();
  });

  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editPopUpFn = (obj: any) => {
    setEditTodoData(obj);
  };
  const projects = useProjectStore((s) => s.projects);

  return (
    <>
      <div className="relative w-full  flex">
        <div className="w-full flex flex-col max-w-3xl mx-auto py-10  ">
          <h1 className="text-sm md:text-2xl font-bold mb:0.5 md:mb-1">
            Inbox
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
                  className="w-62 h-42 rounded-full"
                />
                <h1>Welcome to your Today view</h1>
                <p className="text-muted-foreground mt-1">
                  See everything due today across all your projects.{" "}
                </p>

                    <div className="w-full flex justify-center items-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="default"
                                  className="group flex flex-row items-center px-2 py-1 rounded-md gap-1.5"
                                >
                                  <Plus
                                    className=" min-w-4 min-h-4  text-[#D33327]  rounded-full transition-colors group-hover:bg-[#D33327] group-hover:text-white"
                                  />
                
                                  <p
                                    className=" text-[12px]  text-gray-400 transition-colors group-hover:text-[#D33327]"
                                  >
                                    Add task 
                                  </p>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="center"
                                className="w-[770px]  p-0 border-b border-gray-400/80 "
                              >
                                <Popovers
                                  handleClose={() => {
                                    const popoverTrigger = document.querySelector(
                                      "[data-radix-popover-trigger]"
                                    );
                                    if (popoverTrigger) {
                                      (popoverTrigger as HTMLElement).click();
                                    }
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
              </div>
            </>
          ) : (
            filteredTasks.map((task) => (
              <>
                <div key={task.taskId}>
                  <div
                    key={task.taskId}
                    className="flex flex-col border-b border-gray-200"
                  >
                    <div className="group relative grid grid-cols-6 items-start md:pt-3   ">
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
                          className={`w-3 h-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity relative  md:w-4 md:h-4 border rounded-full cursor-pointer flex items-center justify-center 
       duration-500
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
                      <div className="col-span-1  relative flex border-red-800 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity   justify-end items-center gap-1 text-gray-500">
                        <Popover  >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="p-1 border hidden md:flex rounded-md "
                              onClick={() => {
                                setEditTodoData(task); // edit mode data
                                setEditTaskId(task.taskId); // id set
                              }}
                            >
                              <Edit size={16} />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="end"
                            className="absolute z-20 shadow-2xl bg-transparent bg-blur- top-[16px] right-2 p-0 border-none  w-[660px]"
                          >
                            <Popovers
                              editTodoData={editTodoData}
                              handleClose={() => {
                                const trigger = document.querySelector(
                                  "[data-radix-popover-trigger]"
                                );
                                if (trigger) {
                                  (trigger as HTMLElement).click(); // close popover
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>

                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-1 hidden md:flex rounded-md border-lg">
                            <CalendarIcon size={16} />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className="p-2">
                            <Calendar
                              mode="single"
                              selected={
                                task.dueDate
                                  ? new Date(task.dueDate)
                                  : undefined
                              }
                              onSelect={(date) => {
                                if (!date) return;

                                updateTask(task.taskId, {
                                  dueDate: date.toISOString(),
                                });

                                console.log(
                                  "UPDATED DATE:",
                                  date.toISOString()
                                );
                              }}
                            />
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
                            <DropdownMenuItem></DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="group relative  grid grid-cols-6 items-start  pb-1 ">
                      <div className="flex items-center text-green-600  col-span-2 ">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center gap-1 pl-7">
                              {" "}
                              <Icon name="today" className="w-4 h-4" />
                              <p className=" text-xs">
                                {" "}
                                {friendlyDateLabel(new Date(task.dueDate))}
                              </p>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-23 p-3 bg-black text-gray-100">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="text-sm font-semibold border-b py-1">
                                  {task.dueDate}
                                </h4>
                                <div className="text-muted-foreground text-sm p-1">
                                  {filteredTasks.length} task
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <div
                        onClick={() => handleShowTask(task.taskId)}
                        className="col-span-3 w-full h-full cursor-pointer"
                      ></div>
                      <div className="flex w-full justify-end">
                        <Select>
                          <SelectTrigger className="flex items-center text-xs justify-end">
                            <Icon name="inbox" className="w-4 h-4" />
                            <p>Inbox</p>{" "}
                          </SelectTrigger>
                          <SelectContent className="bg-black text-gray-200 mt-4 border rounded-md p-2 space-y-3 text-xs">
                            {projects.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
           {filteredTasks.length !== 0 && (    <div className="w-full ">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="default"
                            className="group flex flex-row items-center px-2 py-1 rounded-md gap-1.5"
                          >
                            <Plus
                              className=" min-w-4 min-h-4  text-[#D33327]  rounded-full transition-colors group-hover:bg-[#D33327] group-hover:text-white
                  "
                            />
          
                            <p
                              className=" text-[12px]  text-gray-400 transition-colors group-hover:text-[#D33327]
                  "
                            >
                              Add task
                            </p>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="w-[770px]  p-0 border-b border-gray-400/80 "
                        >
                          <Popovers
                            handleClose={() => {
                              const popoverTrigger = document.querySelector(
                                "[data-radix-popover-trigger]"
                              );
                              if (popoverTrigger) {
                                (popoverTrigger as HTMLElement).click();
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>)}
         
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
    </>
  );
};

export default Inbox;
