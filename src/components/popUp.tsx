"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Flag, AlarmClock, Inbox } from "lucide-react";
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
import { useOutsideClick } from "./useOutsideClick";
import { useProjectStore } from "@/state";
import { usePopUpLogic } from "./usePopUpLogic";
import { useEffect, useRef } from "react";
import TaskDetails from "./TaskDetails";
interface PopUpProps {
  selectedDate: Date | null;
  handleTaskInput: () => void;
  handleClose: () => void;
}
export default function PopUp({ selectedDate, handleClose }: PopUpProps) {
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
  } = usePopUpLogic(selectedDate);
  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, handleClose);
  const projects = useProjectStore((s) => s.projects);
  const priorityColors: Record<string, string> = {
    "Priority 1": "text-red-600",
    "Priority 2": "text-orange-500",
    "Priority 3": "text-blue-600",
    "Priority 4": "text-gray-400",
  };
   console.log('data for editing')
  console.log(inputData)
  console.log(description)
    console.log(priority)
  console.log(date)

  
  return (
    <div
      ref={popupRef}
      className="border rounded-xl p-2 bg-white shadow-[0_6px_30px_rgba(0,0,0,0.25)] w-full max-w-3xl animate-slide-up"
    >
      <input
        placeholder="Task name"
        className="w-full outline-none text-sm bg-transparent"
        value={inputData}
        onChange={(e) =>  setInputData(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
            handleClose();
          }
        }}
      />
      <textarea
        placeholder="Description"
        className="w-full text-sm mt-2 outline-none bg-transparent"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center gap-2 mt-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 text-xs">
              <CalendarIcon size={14} />
              {date ? format(date, "PPP") : "Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 text-xs">
              <Flag size={14} className={priorityColors[priority]} />
              {priority}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 text-xs">
              <AlarmClock size={14} />
              {reminder}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
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
      <div className="flex justify-between p-2">
        <Select>
          <SelectTrigger className="w-24 bg-slate-100">
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
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={handleClose} className="border px-3 py-1 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddTask();
              handleClose();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}
