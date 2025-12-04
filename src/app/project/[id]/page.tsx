"use client";

import { useProjectStore, useTodoStore } from "@/state";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  CircleCheck,
  Edit,
  Ellipsis,
  Flag,
  Trash2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function ProjectPage() {
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

  const projects = useProjectStore((s) => s.projects);
  const tasks = useTodoStore((state) => state.tasks);
 const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = projectTasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate.getTime() === today.getTime();
  });

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <div className="p-4 text-red-500">Project not found.</div>;
  }

  return (
    <div className="flex w-full justify-center my-8">
      <p className="text-xl font-semibold text-start mb-6">{project.name}</p>

      <div className="flex flex-row w-full max-w-3xl my-10 ">
        {todayTasks.length === 0 ? (
          <div className="text-center py-8 w-full">
            <p className="text-muted-foreground mt-3">
              No tasks inside this project for today.
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {todayTasks.map((task) => (
              <div
                key={task.taskId}
                className="flex border-b border-gray-200 items-center justify-between p-3 bg-card rounded-md"
              >
                <div className="flex items-center gap-3">
                 <CircleCheck
                    onClick={() => completeTask(task.taskId)}
                    className={`cursor-pointer ${
                      task.completed ? "text-green-500" : ""
                    }`}
                  />
                  <div>
                    <p
                      className={
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {task.name}
                    </p>

                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-1 border rounded-md">
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
                        <button className="p-2 flex gap-2 w-full">
                          <Trash2 onClick={()=> {deleteTask(task.taskId)}} size={16} /> Delete
                        </button>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <button className="p-2 flex gap-2 w-full">
                          <Edit size={16} /> Edit
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
