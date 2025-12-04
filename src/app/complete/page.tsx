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
const Completed = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const completeTask = useTodoStore((state) => state.completeTask);
  const filteredTasks = tasks.filter((task) => task.completed === true);
  return (
    <div className="flex w-full justify-center my-8">
      <p className="text-xl font-semibold">Completed</p>
      <div className="flex flex-row w-full max-w-3xl my-10">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 w-full">
            <p className="text-muted-foreground mt-3">
              No completed tasks yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {filteredTasks.map((task) => (
              <div
                key={task.taskId}
                className="flex border-b border-gray-200 items-center justify-between p-3 bg-card rounded-md"
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle
                      onClick={() => completeTask(task.taskId)}
                      className="cursor-pointer text-green-500 hover:text-green-600"
                    />
                  ) : (
                    <Circle
                      onClick={() => completeTask(task.taskId)}
                      className="cursor-pointer hover:text-green-500"
                    />
                  )}
                  <div>
                    <p className="text-muted-foreground line-through">
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
                        <button
                          onClick={() => deleteTask(task.taskId)}
                          className="p-2 flex gap-2 w-full"
                        >
                          <Trash2 size={16} /> Delete
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
};

export default Completed;
