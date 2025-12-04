"use client";

import { useState } from "react";
import { useTodoStore } from "@/state";
import { Search as SearchIcon } from "lucide-react";
import TaskDetails from "@/components/TaskDetails";

const SearchSection = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const [showTask, setShowTask] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);

  const handleShowTask = (taskId?: string) => {
    if (taskId) setSelectedTaskId(taskId);
    setShowTask(!showTask);
  };
  const filteredTasks = tasks
    .filter((task) =>
      task.name?.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(0, 10);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative mt-6 mb-4">
        <SearchIcon className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.taskId}
              className="flex justify-between p-3 bg-white rounded-xl shadow-sm border"
            >
              <p>{task.name}</p>
              <button
                onClick={() => handleShowTask(task.taskId)}
                className="underline text-start text-red-600"
              >
                details
              </button>
            </div>
          ))
        )}
      </div>
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
    </div>
  );
};

export default SearchSection;
