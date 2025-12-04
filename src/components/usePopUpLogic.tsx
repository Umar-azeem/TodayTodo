"use client";
import { useState } from "react";
import { useTodoStore } from "@/state";
import { useParams } from "next/navigation";

export function usePopUpLogic(selectedDate?: Date) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [priority, setPriority] = useState("Priority 2");
  const [reminder, setReminder] = useState("No reminder");
  const [description, setDescription] = useState("");
  const [inputData, setInputData] = useState("");

  const addTask = useTodoStore((s) => s.addTask);
  const params = useParams();
  const projectId = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "";

  const finalDate = date ?? selectedDate ?? new Date();
  const formattedDate = finalDate.toISOString().split("T")[0];

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

    setInputData("");
    setDescription("");
  };

  return {
    date,
    priority,
    reminder,
    description,
    inputData,

    setDate,
    setPriority,
    setReminder,
    setDescription,
    setInputData,

    handleAddTask,
  };
}
