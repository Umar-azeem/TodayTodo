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
import { useProjectStore } from "@/state";
import { usePopUpLogic } from "./usePopUpLogic";
import { useEffect } from "react";
interface PopUpProps {
  selectedDate?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  console.log("data for editing");
  console.log(editTodoData);
  useEffect(() => {
    if (editTodoData) {
      setInputData(editTodoData.name);
      setDescription(editTodoData.description);
      setPriority(editTodoData.priority);
      setReminder(editTodoData.reminder);
      setDate(new Date(editTodoData.dueDate));
    }
  }, [editTodoData, setInputData, setDate, setPriority, setReminder,setDescription]);
  const createOrEdit = () => {
    if (editTodoData) {
      updateTask(editTodoData?.taskId, {
        name: inputData,
        description,
        priority,
        reminder,
        dueDate: date ? date.toISOString() : undefined,
      });
      console.log("updateTask task", updateTask);
    } else {
      handleAddTask();
      console.log("add task eidt", handleAddTask);
    }
  };
  return (
    <div className="border rounded-xl p-2 bg-white shadow-[0_6px_30px_rgba(0,0,0,0.25)] w-full max-w-3xl ">
      <input
        placeholder="Task name"
        className="w-full outline-none text-sm bg-transparent"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createOrEdit();
            handleClose?.();
            handleClosePopup?.();
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
            <div className="absolute z-20">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
              />
            </div>
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
          {["No reminder", "Today 6pm", "Tomorrow 9am", "Custom"].map((r) => (
            <CommandItem
              key={r}
              onSelect={() => {
                setReminder(r);
                if (editTodoData) {
                  updateTask(editTodoData.taskId, {
                    name: inputData,
                    description,
                    priority,
                    reminder: r,
                    dueDate: date ? date.toISOString() : undefined,
                  });
                }
              }}
            >
              {r}
            </CommandItem>
          ))}
        </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between p-3">
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
          <button onClick={handleClose} className="border px-3 py-0.5 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              createOrEdit();
              handleClose?.();
              handleClosePopup?.();
            }}
            className="bg-red-500 text-white px-3 py-0.5 rounded-sm"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}
