// "use client";

// import { useState } from "react";
// import { useProjectStore, useTodoStore } from "@/state";

// export function useTaskPopup() {
//   const projects = useProjectStore((s) => s.projects);
//   const addTask = useTodoStore((s) => s.addTask);

//   const [date, setDate] = useState<Date | undefined>();
//   const [priority, setPriority] = useState<string>("Priority 2");
//   const [reminder, setReminder] = useState<string>("No reminder");
//   const [description, setDescription] = useState<string>("");
//   const [inputData, setInputData] = useState<string>("");

//   const formattedDate = date
//     ? new Date(date).toISOString().split("T")[0]
//     : new Date().toISOString().split("T")[0];

//   const handleAddTask = () => {
//     if (!inputData.trim()) return;

//     addTask({
//       taskId: crypto.randomUUID(),
//       name: inputData,
//       description: description,
//       priority,
//       dueDate: formattedDate,
//       reminder,
//       completed: false,
//       createdAt: new Date().toISOString(),
//     });

//     // reset fields after adding
//     setInputData("");
//     setDescription("");
//     setPriority("Priority 2");
//     setReminder("No reminder");
//     setDate(undefined);
//   };

//   return {
//     date,
//     setDate,
//     priority,
//     setPriority,
//     reminder,
//     setReminder,
//     description,
//     setDescription,
//     inputData,
//     setInputData,
//     projects,
//     handleAddTask,
//   };
// }
