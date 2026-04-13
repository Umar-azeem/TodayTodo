"use client";
import { InView } from "react-intersection-observer";
import React, { useMemo, useRef, useState } from "react";
import moment from "moment";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import Popovers from "./../../components/popover";
import { useInView } from "react-intersection-observer";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Icon from "./../../../public/icon/icons";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select,
} from "@radix-ui/react-select";
import { useProjectStore, useTodoStore } from "@/state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import TaskDetails from "@/components/TaskDetails";
import { format, isToday, isTomorrow, isYesterday, isThisWeek } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const ViewElement = ({
  visibleElement,
  setVisibleElement,
  i,
}: {
  visibleElement: number;
  setVisibleElement: (v: number) => void;
  i: number;
}) => {
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTodoStore((s) => s.tasks);
  const deleteTask = useTodoStore((s) => s.deleteTask);
  const completeTask = useTodoStore((s) => s.completeTask);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [flashTick, setFlashTick] = useState<string | null>(null);
  const [isTicking, setIsTicking] = useState<string | number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const grouped = useMemo(() => {
    return tasks.reduce((acc: Record<string, any[]>, task) => {
      const key = new Date(task.dueDate).toDateString();
      acc[key] ??= [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  function friendlyDateLabel(date: Date) {
    if (!date) return "No date";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";
    if (isThisWeek(date)) {
      return format(date, "EEEE");
    }
    return format(date, "MMM d, yyyy");
  }

  const sectionDate = moment().add(i, "day").startOf("day");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const filteredTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = moment(task.dueDate).startOf("day");
    return taskDate.isSame(sectionDate, "day");
  });

  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);
  
  const handleShowTask = (taskId?: string) => {
    if (taskId) setSelectedTaskId(taskId);
    setShowTask(true);
  };

  const selectedDate = moment().add(i, "day").toDate();

  return (
    <div className="relative">
      <InView
        threshold={0.89}
        onChange={(v) => {
          if (v) {
            setVisibleElement(i);
          }
        }}
      >
        {({ ref }) => {
          return (
            <div
              ref={ref}
              id={`section-${i}`}
              style={{ width: 100 + i + "px" }}
              className={`h-[calc(100vh-_77px)] absolute w-80`}
            ></div>
          );
        }}
      </InView>
      <div className="p-4 h-full relative bg-white">
        <div
          className={`text-[16px] border-b h-9  flex justify-start sticky  items-center  text-gray-500  top-[76px] font-bold`}
        >
          <h2 className=" shadow-sm">
            {moment().add(i, "day").format("D MMM [•] dddd")}
          </h2>
        </div>
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.taskId}
              className="flex flex-col border-b border-gray-200"
            >
              <div className="group relative grid grid-cols-6 items-start md:pt-3">
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
                    className={`w-4 h-4 border rounded-full cursor-pointer flex items-center justify-center 
                      duration-500
                      ${task.completed ? "border-red-500 bg-red-500" : "border-gray-500"}
                      ${isTicking === task.taskId ? "bg-red-500 border-red-500 text-white scale-125" : ""}
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
                    className={`text-xs md:text-sm cursor-pointer 
                      ${task.completed ? "line-through text-gray-400" : "text-gray-900"}
                    `}
                  >
                    {task.name}
                  </p>
                </div>
                <div
                  onClick={() => handleShowTask(task.taskId)}
                  className="col-span-3 w-full h-full cursor-pointer"
                ></div>
                <div className="col-span-1 flex my-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity relative justify-end items-center gap-1 text-gray-500">
                  <button
                    onClick={() => deleteTask(task.taskId)}
                    className="p-0 border-1 flex gap-2 text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="group relative grid grid-cols-6 items-start pb-1">
                <div className="flex items-center text-red-600 col-span-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-1 pl-7">
                        <Icon name="today" className="w-4 h-4" />
                        <p className="text-xs">
                          {friendlyDateLabel(new Date(task.dueDate))}
                        </p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-23 p-3 z-20 bg-black text-gray-100">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm font-semibold border-b py-1">
                            {friendlyDateLabel(new Date(task.dueDate))}
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
                      <p>Inbox</p>
                    </SelectTrigger>
                    <SelectContent className="bg-black text-gray-200 mt-4 border rounded-md p-2 space-y-3 text-xs">
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              className="group flex flex-row items-center px-2 py-1 rounded-md gap-1.5"
            >
              <Plus className="min-w-5 min-h-5 font-extralight text-[#D33327] rounded-full transition-colors group-hover:bg-[#D33327] group-hover:text-white" />
              <p className="text-[14px] text-gray-400 transition-colors group-hover:text-[#D33327]">
                Add task
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[770px] absolute z-30 p-0 border-b border-gray-400/80"
          >
            <Popovers
              selectedDate={selectedDate}
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
    </div>
  );
};

const Upcoming = () => {
  const TOTAL_DAYS = 30;
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [visibleElement, setVisibleElement] = useState(-1);
  const [currentWeekStart, setCurrentWeekStart] = useState(0);
  const scrollRef = useRef(null);
  const { ref: sentinelRef, inView } = useInView({
    root: scrollRef.current,
    threshold: 0,
  });

  React.useEffect(() => {
    if (visibleElement >= 0) {
      const weekIndex = Math.floor(visibleElement / 7);
      setCurrentWeekStart(weekIndex * 7);
    }
  }, [visibleElement]);

  const getCurrentWeekDays = () => {
    return Array.from({ length: 7 }).map((_, dayIndex) => {
      const dayOffset = currentWeekStart + dayIndex;
      return {
        date: moment().add(dayOffset, "day").toDate(),
        index: dayOffset,
      };
    });
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto relative">
        <div className="flex flex-row-reverse top-0 sticky">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center p-4 gap-2 hover:bg-[#F1EFED] rounded-md font-semibold text-sm text-gray-600">
                <Icon name="three-line" className="w-6 h-6" />
                <span>Display: 3</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-30 bg-black text-white p-2"
            >
              <div className="space-y-2">
                <h4 className="font-medium">List</h4>
                <hr className="bg-gray-700" />
                <p className="text-sm">Change layout & view ⇧ V</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="container mx-auto max-w-4xl px-14 pt-2 top-0 sticky">
          <h1 className="text-[26px] font-[700] text-gray-900">Upcoming</h1>
        </div>
        <div className="container mx-auto max-w-4xl px-14 flex justify-between">
          <div className="flex absolute z-50 flex-col items-center justify-center gap-1 bg-white">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  id="date"
                  className="w-32 justify-center font-normal"
                >
                  {date ? moment(date).format("MMMM YYYY") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  className="bg-white"
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const safeDate = new Date(selectedDate);
                      safeDate.setHours(0, 0, 0, 0);
                      setDate(safeDate);

                      const daysDiff = moment(safeDate).diff(moment().startOf("day"), "days");
                      
                      if (daysDiff >= 0 && daysDiff < TOTAL_DAYS) {
                        const el = document.getElementById(`section-${daysDiff}`);
                        el?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setVisibleElement(daysDiff);
                      }

                      setOpen(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>Today Switch</div>
        </div>
        <div
          ref={sentinelRef}
          className="w-full sticky top-0 flex flex-col justify-center items-center bg-white z-10 border-b"
        >
          <div
            className={`mx-auto transition-all duration-500 ease-in-out
              ${inView ? "opacity-100 translate-y-[-10px]" : "opacity-100 translate-y-0"}
            `}
          >
            <h1 className="text-md font-[700] pt-2 text-gray-900">Upcoming</h1>
          </div>
          <div className="flex flex-row">
            {getCurrentWeekDays().map(({ date: dayDate, index }) => {
              const dateMoment = moment(dayDate);
              const month = dateMoment.format("MMM");
              const day = dateMoment.format("D");
              
              return (
                <div
                  key={index}
                  className="w-24 text-center text-sm py-1 rounded-md hover:bg-gray-200 cursor-pointer px-4"
                >
                  <span>{month}</span>
                  <button
                    onClick={() => {
                      const el = document.getElementById(`section-${index}`);
                      el?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setDate(dateMoment.clone().startOf("day").toDate());
                    }}
                  >
                    <span
                      className={`px-1 ${
                        visibleElement === index
                          ? "bg-[#D33322] rounded-sm text-white"
                          : ""
                      }`}
                    >
                      {day}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container mx-auto max-w-4xl px-14">
          {Array.from({ length: TOTAL_DAYS }).map((_, i) => {
            return (
              <ViewElement
                i={i}
                visibleElement={visibleElement}
                setVisibleElement={setVisibleElement}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Upcoming;