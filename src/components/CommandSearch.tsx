"use client";

import { useState, useMemo } from "react";
import { useTodoStore } from "@/state";
import {
  Clock,
  CalendarDays,
  CalendarRange,
  Inbox,
} from "lucide-react";
import TaskDetails from "./TaskDetails";
import { usePathname, useRouter } from "next/navigation";

const useCommandSearch = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const [query, setQuery] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    if (!query.trim()) return [];
    return tasks
      .filter((task) =>
        task.name?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [query, tasks]);

  return {
    tasks,
    query,
    setQuery,
    filteredTasks,
    selectedTaskId,
    setSelectedTaskId,
  };
};

/* -------------------- MAIN COMPONENT -------------------- */
const CommandSearch = () => {
  const router = useRouter(); // ✅ FIX
  const pathname = usePathname();

  const {
    tasks,
    query,
    setQuery,
    filteredTasks,
    selectedTaskId,
    setSelectedTaskId,
  } = useCommandSearch();

  const [showTask, setShowTask] = useState(false);

  const selectedTask = tasks.find((t) => t.taskId === selectedTaskId);

  return (
    <>
      {/* Command Palette */}
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden">
          {/* Search input */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto px-4 py-3 text-sm">
            {!query && (
              <>
                <Section title="Recent searches">
                  <Item icon={<Clock size={16} />} label="umar" />
                </Section>

                <Section title="Recently viewed">
                  <Item
                    icon={<CalendarDays size={16} />}
                    label="Today"
                    active={pathname === "/today"}
                    onClick={() => router.push("/today")}
                  />

                  <Item
                    icon={<CalendarRange size={16} />}
                    label="Upcoming"
                    active={pathname === "/upcoming"}
                    onClick={() => router.push("/upcoming")}
                  />

                  <Item
                    icon={<Inbox size={16} />}
                    label="Completed"
                    active={pathname === "/complete"}
                    onClick={() => router.push("/complete")}
                  />
                </Section>

                <Section title="Navigation">
                  <Item
                    label="Go to Today"
                    shortcut="G T"
                    onClick={() => router.push("/today")}
                  />
                  <Item
                    label="Go to Upcoming"
                    shortcut="G U"
                    onClick={() => router.push("/upcoming")}
                  />
                  <Item
                    label="Go to Completed"
                    shortcut="G C"
                    onClick={() => router.push("/complete")}
                  />
                </Section>
              </>
            )}

            {query && (
              <>
                {filteredTasks.length === 0 ? (
                  <p className="text-gray-400 py-6">No results found</p>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.taskId}
                      onClick={() => {
                        setSelectedTaskId(task.taskId);
                        setShowTask(true);
                      }}
                      className="p-2 flex justify-start rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      {task.name}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showTask && selectedTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl p-6 rounded-lg shadow-lg bg-white">
            <TaskDetails
              task={selectedTask}
              handleShowTask={() => setShowTask(false)}
            />
            <button
              onClick={() => setShowTask(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandSearch;


const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4">
    <h4 className="text-xs text-gray-400 mb-2">{title}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({
  icon,
  label,
  shortcut,
  onClick,
  active,
}: {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  active?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`flex justify-between items-center p-2 rounded-md cursor-pointer
      ${active ? "bg-red-50 text-red-600" : "hover:bg-gray-100"}
    `}
  >
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
    {shortcut && <span className="text-xs text-gray-400">{shortcut}</span>}
  </div>
);
