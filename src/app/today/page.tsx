"use client";

import { useTodoStore } from "@/state";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Circle,
  Edit,
  Ellipsis,
  Flag,
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

const Today = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const updateTask = useTodoStore((state) => state.updateTask);

  const [showTask, setShowTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleShowTask = (taskId?: string) => {
    if (taskId) setSelectedTaskId(taskId);
    setShowTask(!showTask);
  };

  const startEditing = (task: any) => {
    setEditingId(task.taskId);
    setEditName(task.name);
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateTask(editingId, { name: editName });
    setEditingId(null);
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

  return (
    <>
      <div className="relative flex w-full justify-center my-8">
        <p className="text-xl font-semibold">Today</p>
        <div className="flex flex-col w-full max-w-3xl my-10 gap-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 w-full">
              <p className="text-muted-foreground mt-3">
                No tasks yet. Add one to get started!
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.taskId}
                className="relative flex border-b border-gray-200 items-center justify-between p-3 bg-card rounded-md cursor-pointer hover:bg-accent duration-100"
              >
                <div className="relative flex items-center gap-3">
                  <>
                    {task.completed ? (
                      <CheckCircle
                        onClick={() => completeTask(task.taskId)}
                        className="cursor-pointer text-green-500 hover:text-green-600"
                      />
                    ) : (
                      <Circle
                        onClick={() => completeTask(task.taskId)}
                        className="cursor-pointer  hover:text-green-500"
                      />
                    )}
                  </>
                  {showTask && selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                      <div className="relative w-full max-w-3xl p-6  rounded-lg shadow-lg">
                        <TaskDetails
                          task={selectedTask}
                          handleShowTask={() => setShowTask(false)}
                        />
                        <button
                          onClick={() => setShowTask(false)}
                          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                        ></button>
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    {editingId === task.taskId ? (
                      <div className="flex items-center gap-2">
                        <input
                          className="border border-[#DC4C3E] p-2 rounded"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                        <button
                          onClick={saveEdit}
                          className="bg-[#DC4C3E] text-white px-3 py-1 rounded-3xl"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        className={
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {task.name}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleShowTask(task.taskId)}
                    className="underline text-start text-red-600"
                  >
                    details
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    className="p-1 border rounded-md"
                    onClick={() => startEditing(task)}
                  >
                    <Edit size={16} />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 border rounded-md">
                      <CalendarIcon size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                      <Calendar mode="single" />
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button className="p-1 border rounded-md">
                    <Flag size={16} />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 border rounded-md">
                      <Ellipsis size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button
                          onClick={() => deleteTask(task.taskId)}
                          className="p-2 flex gap-2 w-full"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={() => startEditing(task)}
                          className="p-2 flex gap-2 w-full"
                        >
                          <Edit size={16} /> Edit
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Today;
