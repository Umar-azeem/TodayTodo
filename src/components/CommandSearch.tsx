"use client";

import { useState, useMemo, useEffect } from "react";
import { useTodoStore } from "@/state";
import {
  Clock,
  CalendarDays,
  CalendarRange,
  Inbox,
  X,
} from "lucide-react";
import TaskDetails from "./TaskDetails";
import { usePathname, useRouter } from "next/navigation";

/* ================= TYPES ================= */
type CommandSearchProps = {
  onClose: () => void;
};

/* ================= HOOK ================= */
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

/* ================= MAIN ================= */
const CommandSearch = ({ onClose }: CommandSearchProps) => {
  const router = useRouter();
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

  /* ===== RECENT SEARCHES ===== */
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // save helper
  const addRecentSearch = (value: string) => {
    if (!value.trim()) return;

    const updated = [
      value,
      ...recentSearches.filter((v) => v !== value),
    ].slice(0, 4);

    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  const selectedTask = tasks.find((t) => t.taskId === selectedTaskId);

  return (
    <>
      {/* ================= SEARCH MODAL ================= */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden relative">

          {/* CLOSE */}
          <div className="p-2 flex justify-end">
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* INPUT */}
          <div className="p-2 border-b">
            <input
              autoFocus
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* CONTENT */}
          <div className="max-h-[400px] overflow-y-auto p-4 text-sm">

            {/* ===== EMPTY SEARCH ===== */}
            {!query && (
              <>
                {recentSearches.length > 0 && (
                  <Section title="Recent searches">
                    {recentSearches.map((item) => (
                      <Item
                        key={item}
                        icon={<Clock size={16} />}
                        label={item}
                        onClick={() => setQuery(item)}
                      />
                    ))}
                  </Section>
                )}

                <Section title="Navigation">
                  <Item
                    icon={<CalendarDays size={16} />}
                    label="Today"
                    active={pathname === "/today"}
                    onClick={() => {
                      addRecentSearch("Today");
                      router.push("/today");
                      onClose();
                    }}
                  />
                  <Item
                    icon={<CalendarRange size={16} />}
                    label="Upcoming"
                    active={pathname === "/upcoming"}
                    onClick={() => {
                      addRecentSearch("Upcoming");
                      router.push("/upcoming");
                      onClose();
                    }}
                  />
                  <Item
                    icon={<Inbox size={16} />}
                    label="Completed"
                    active={pathname === "/complete"}
                    onClick={() => {
                      addRecentSearch("Completed");
                      router.push("/complete");
                      onClose();
                    }}
                  />
                </Section>
              </>
            )}

            {/* ===== SEARCH RESULTS ===== */}
            {query && (
              <>
                {filteredTasks.length === 0 ? (
                  <p className="text-gray-400 py-6 text-center">
                    No results found
                  </p>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.taskId}
                      onClick={() => {
                        addRecentSearch(query);
                        setSelectedTaskId(task.taskId);
                        setShowTask(true);
                      }}
                      className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
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

      {/* ================= TASK DETAILS ================= */}
      {showTask && selectedTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl p-6 rounded-xl relative">
            <button
              onClick={() => setShowTask(false)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <TaskDetails
              task={selectedTask}
              handleShowTask={() => setShowTask(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CommandSearch;

/* ================= HELPERS ================= */

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
  onClick,
  active,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer
      ${active ? "bg-red-50 text-red-600" : "hover:bg-gray-100"}
    `}
  >
    {icon}
    <span>{label}</span>
  </div>
);
