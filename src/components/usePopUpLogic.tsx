/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useTodoStore } from "@/state";
import { useParams } from "next/navigation";

export function usePopUpLogic(selectedDate?: Date, handleTaskOpen?: () => void) {
  const [date, setDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState("Priority 2");
  const [reminder, setReminder] = useState<string>("No reminder");
  const [description, setDescription] = useState("");
  const [inputData, setInputData] = useState("");
  const [editPopUp, setEditPopUp] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const addTask = useTodoStore((s) => s.addTask);
  const updateTask = useTodoStore((s) => s.updateTask);

  const params = useParams();
  const projectId = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "";

  // const finalDate =
  // date instanceof Date
  //   ? date
  //   : selectedDate instanceof Date
  //   ? selectedDate
  //   : new Date();

const finalDate = (value?: string | Date) => {
  const d = new Date(value ?? new Date());
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
};

const formattedDate = finalDate(date ?? selectedDate);

  const openEditPopup = (task: any) => {
    console.log(task);
    setEditTaskId(task.taskId);
    setInputData(task.name);
    setDescription(task.description);
    setPriority(task.priority);
    setReminder(task.reminder);
    setDate(new Date(task.dueDate));
    setEditPopUp(true);
  };

  //  const saveEditPopup = () => {
  //   console.log("id",editTaskId)
  //   if (!editTaskId) return;

  //   updateTask(editTaskId, {
  //     name: inputData,
  //     description,
  //     priority,
  //     reminder,
  //     dueDate: formattedDate,
  //   });
  //   setEditPopUp(false);
  // };
  // const saveEditPopup = () => {
  //   if (!editTaskId) return;

  //   updateTask(editTaskId, {
  //     name: inputData,
  //     description,
  //     priority,
  //     reminder,
  //     dueDate: formattedDate,
  //   });

  //   setEditPopUp(false);
  // };

  const handleAddTask = () => {
    if (!inputData.trim()) return;

    addTask({
      taskId: crypto.randomUUID(),
      name: inputData,
      description,
      priority,
      dueDate: formattedDate,
      reminder,
      completed: false,
      createdAt: new Date().toISOString(),
      projectId,
    });
    console.log("add    Task", addTask);
    setInputData("");
    setDescription("");
  };

  return {
    date,
    priority,
    reminder,
    description,
    inputData,
    editPopUp,
    editTaskId,

    setDate,
    setPriority,
    setReminder,
    setDescription,
    setInputData,
    setEditTaskId,
    setEditPopUp,
    updateTask,
    handleAddTask,
    openEditPopup,
    handleTaskOpen,
    // saveEditPopup,
  };
}
