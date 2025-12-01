"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, AlarmClock, Flag, Ellipsis, Inbox } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandGroup,
} from "@/components/ui/command";
import { useProjectStore, useTodoStore } from "@/state";
import { useParams } from "next/navigation";
interface PopUpProps {
  handleTaskInput: () => void;
}

function PopUp({ handleTaskInput }: PopUpProps) {
  const project = [{ item: "Inbox", icon: Ellipsis }];
  const [date, setDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<string>("Priority 2");
  const [reminder, setReminder] = useState<string>("No reminder");
  const [description, SetDescription] = useState<string>("");
  // const [status, setStatus] = useState<boolean>(false);
  const projects = useProjectStore((s) => s.projects);
  // const [addData, setAddData] = useState<string>('');
  const [inputData, setInputData] = useState<string>("");
  const addTask = useTodoStore((s) => s.addTask);
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const taskId = crypto.randomUUID();

  const handleAddTask = () => {
    if (!inputData.trim()) return;
    addTask({
      taskId: taskId,
      name: inputData,
      description: description,
      priority: priority,
      dueDate: formattedDate,
      reminder: reminder,
      completed: false,
      createdAt: new Date().toISOString(),
      projectId: projectId,
    });
    setInputData("");
  };

  
  return (
    <div className="border rounded-xl m-2 py-4 px-2 w-full h-1/4 bg-white shadow-2xl sha shadow-gray-400">
      <input
        className="w-full  text-sm outline-none"
        placeholder="Task name"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {JSON.stringify(inputData)}
      <textarea
        className="w-full text-sm mt-1 outline-none"
        placeholder="Description"
        onChange={(e) => SetDescription(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask}
      />
      <div className="flex items-center gap-1 mt-1 text-xs">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-1">
              <CalendarIcon size={10} />
              {date ? format(date, "PPP") : "Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex ">
              <Flag size={10} />
              {priority}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-2 w-40">
            <Command>
              <CommandInput placeholder="priority..." />
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
            <Button variant="outline" className="flex gap-2">
              <AlarmClock size={14} /> {reminder}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-48 p-2">
            <Command>
              <CommandInput placeholder="reminder..." />
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-52">
            <Command>
              <CommandInput placeholder="search projects..." />
              <CommandList>
                <CommandGroup>
                  {project.map((p) => (
                    <CommandItem
                      key={p.item}
                      // onSelect={() => setProject(p)}
                    >
                      <p.icon className="mr-2 h-4 w-4" />
                      {p.item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <Select>
          <SelectTrigger className="w-[100px]">
            <Inbox className="h-4 w-4" />
            <SelectValue placeholder="inbox" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectGroup key={p.id}>
                <SelectItem value="p">{p.name}</SelectItem>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-end gap-2 ">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={() => {
              handleAddTask();
              handleTaskInput();
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Add task
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PopUp;
