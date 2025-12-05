"use client";
import { Task } from "@/state";

interface TaskDetailsProps {
  handleShowTask: () => void;
  task: Task;
}

import { useTodoStore } from "@/state";
import {
  CalendarDays,
  Flag,
  Hash,
  Bell,
  MapPin,
  CircleCheck,
  Circle,
} from "lucide-react";
interface TaskDetailsProps {
  handleShowTask: () => void;
  task: Task;
}

export default function TaskDetails({
  handleShowTask,
  task,
}: TaskDetailsProps) {
  const completeTask = useTodoStore((state) => state.completeTask);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white max-w-3xl w-full rounded-xl shadow-lg relative flex">
        <div className="flex-1 p-6 border-r border-gray-200">
          <button
            onClick={handleShowTask}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {task.completed ? (
              <CircleCheck
                onClick={() => completeTask(task.taskId)}
                className="cursor-pointer w-4 h-4 text-green-500"
              />
            ) : (
              <Circle
                onClick={() => completeTask(task.taskId)}
                className="cursor-pointer w-4 h-4"
              />
            )}

            <span className={task.completed ? "line-through" : ""}>
              {task.name}
            </span>
          </div>

          <p className="ml-7 mt-2 text-gray-600">{task.description}</p>
        </div>

        <div className="w-80 p-6 text-sm bg-white">
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Project</p>
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-purple-600" />
              <span>{task.projectId}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 mb-1">Date</p>
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-green-600" />
              <span>{task.dueDate}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 mb-1">Status</p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>
                <span>{task.completed ? "Completed" : "Pending"}</span>
              </span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 mb-1">Priority</p>
            <div className="flex items-center gap-2">
              <Flag size={15} className="text-orange-600" />
              <span>{task.priority}</span>
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-500 mb-1">Labels</p>
            <button className="text-gray-500 hover:underline text-lg leading-none">
              +
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Reminders</p>
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-blue-600" />
              <span>No reminder</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Location</p>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={15} />
              <span>Locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
