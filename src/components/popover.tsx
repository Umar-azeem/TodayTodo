"use client";

import { useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Flag, AlarmClock, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

import { useProjectStore } from "@/state";
import { usePopUpLogic } from "./usePopUpLogic";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import Icon from "../../public/icon/icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

interface PopUpProps {
  selectedDate?: Date;
  editTodoData?: any;
  handleClose?: () => void;
  handleClosePopup?: () => void;
  handleTaskOpen?: () => void;
}

export default function PopUp({
  selectedDate,
  handleClose,
  editTodoData,
  handleTaskOpen,
  handleClosePopup,
}: PopUpProps) {
  const {
    date,
    description,
    priority,
    reminder,
    inputData,
    setDate,
    setDescription,
    setPriority,
    setReminder,
    setInputData,
    handleAddTask,
    updateTask,
  } = usePopUpLogic(selectedDate, handleTaskOpen);

  const projects = useProjectStore((s) => s.projects);

  const priorityColors: Record<string, string> = {
    "Priority 1": "text-red-600",
    "Priority 2": "text-orange-500",
    "Priority 3": "text-blue-600",
    "Priority 4": "text-gray-400",
  };

  useEffect(() => {
    if (editTodoData) {
      setInputData(editTodoData.name);
      setDescription(editTodoData.description);
      setPriority(editTodoData.priority);
      setReminder(editTodoData.reminder);
      setDate(new Date(editTodoData.dueDate));
    }
  }, [
    editTodoData,
    setInputData,
    setDate,
    setPriority,
    setReminder,
    setDescription,
  ]);

  const createOrEdit = () => {
    if (editTodoData) {
      updateTask(editTodoData.taskId, {
        name: inputData,
        description,
        priority,
        reminder,
        dueDate: date?.toISOString(),
      });
    } else {
      handleAddTask();
    }
  };

  const safeFormatDate = (value?: Date) =>
    value ? format(value, "PPP") : "Date";

  return (
    <div className="flex flex-col border border-gray-200 p-3 rounded-xl  bg-white">
      <div className="flex w-full justify-between items-center">
        <input
          placeholder="Task name"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createOrEdit();
              handleClose?.();
              handleClosePopup?.();
            }
          }}
          className=" text-lg font-semibold outline-none border-gray-200 "
        />{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex  items-center gap-1 ">
              <Icon name="line" className="w-[21px] h-[21px] text-gray-400" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-23 p-2 rounded-md bg-black text-gray-100">
            <div className="flex w-48 flex-row items-center justify-between">
              <p className=" text-xs">Dictate tasks with Ramble</p>

              <p className=" text-white w-5 text-center  rounded-sm bg-gray-700 ">
                {" "}
                ⇧
              </p>

              <p className=" text-white w-5 text-center  rounded-sm bg-gray-700  ">
                {" "}
                Q
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className=" resize-none border-hidden text-sm outline-none"
      />

      {/* Actions */}
      <div className="flex flex-wrap font-normal gap-2 my-2 text-xs text-gray-500">
        {/* Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="default"
              className="flex gap-2 font-normal text-xs px-1 border "
            >
              <CalendarIcon size={14} />
              {safeFormatDate(date)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1 w-auto" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
            />
          </PopoverContent>
        </Popover>

        {/* Priority */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="default"
              className="flex gap-2 font-normal text-xs px-1 border "
            >
              <Flag size={14} className={priorityColors[priority]} />
              {priority}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {["Priority 1", "Priority 2", "Priority 3", "Priority 4"].map(
                    (p) => (
                      <CommandItem key={p} onSelect={() => setPriority(p)}>
                        {p}
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Reminder */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="default"
              className="flex gap-2 font-normal text-xs px-2 p-1 border "
            >
              <AlarmClock size={14} />
              {reminder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {["No reminder", "Today 6pm", "Tomorrow 9am", "Custom"].map(
                    (r) => (
                      <CommandItem key={r} onSelect={() => setReminder(r)}>
                        {r}
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <hr className="my-1" />
      {/* Footer */}
      <div className="flex justify-between items-center mt-1">
        <Select>
          <SelectTrigger className="w-32">
            <Inbox size={14} />
            Inbox
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Popover>
            <PopoverClose>
              <Button
                variant="default"
                size="default"
                className="border px-3 py-1"
                onClick={handleClose}
              >
                {" "}
                Cancel
              </Button>
            </PopoverClose>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
            <PopoverClose>
           
              <Button
                variant="default"
                size="default"
                onClick={() => {
                  createOrEdit();
                  handleClose?.();
                  handleClosePopup?.();
                }}
                className={`"bg-[#D33322] text-white px-3 py-1  opacity-60 ${inputData ? " bg-[#D33322] opacity-100" :  "bg-[#D33322]  opacity-60" }   "`}
              >
                Save
              </Button>
              
            </PopoverClose>
            </PopoverTrigger>
          </Popover>
        </div>
      </div>
    </div>
  );
}
