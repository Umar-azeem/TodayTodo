"use client";
import Link from "next/link";
import {
  Plus,
  Search,
  Inbox,
  CalendarDays,
  CalendarRange,
  Filter,
  CheckCircle2,
  Hash,
} from "lucide-react";
import { useProjectStore } from "@/state";
import { useRef, useState } from "react";
import PopUp from "./popUp";
export default function Sidebar() {
  const projects = useProjectStore((state) => state.projects);
  const [openInput, setOpeninput] = useState(false);
  const [openTaskInput, setOpenTaskInput] = useState(false);
  const popupRef = useRef(null);
  const handleTaskInput = () => {
    setOpenTaskInput(!openTaskInput);
  };

  const handleInput = () => {
    setOpeninput(!openInput);
  };

  const [newProjectName, setNewProjectName] = useState<string>("");
  const addProject = useProjectStore((s) => s.addProject);
  const handleAddProject = () => {
    if (!newProjectName.trim()) return;
    addProject({
      id: crypto.randomUUID(),
      name: newProjectName,
    });
    setNewProjectName("");
  };
  console.log("ss", newProjectName);
  return (
    <div>
      {openTaskInput && (
        <div className="absolute h-screen flex justify-center items-center z-40 w-full">
          <div
            ref={popupRef}
            className="w-full max-w-lg flex justify-center items-center"
          >
            {" "}
            <PopUp
              handleTaskInput={handleTaskInput}
            />
          </div>
        </div>
      )}
      <div className="relative w-64 h-screen border-r bg-white p-4 flex flex-col text-sm">
        <button
          onClick={handleTaskInput}
          className="flex items-center gap-2 text-red-600 font-medium  hover:bg-red-50 rounded-md "
        >
          <Link
            href=""
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
          >
            <Plus size={18} /> Add task
          </Link>
        </button>
        <Link
          href="/search"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <Search size={18} />
          Search
        </Link>
        <Link
          href="/inbox"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <Inbox size={18} />
          Inbox
          <span className="ml-auto text-xs text-gray-500">4</span>
        </Link>
        <Link
          href="/today"
          className="flex items-center gap-2 p-2 rounded-md bg-red-50  text-red-600"
        >
          <CalendarDays size={18} />
          Today
        </Link>
        <Link
          href="/upcoming"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <CalendarRange size={18} />
          Upcoming
        </Link>
        <Link
          href="/filters-labels"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <Filter size={18} />
          Filters & Labels
        </Link>
        <Link
          href="/complete"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
        >
          <CheckCircle2 size={14} />
          Completed
        </Link>
        <div className="mt-6 font-medium text-gray-500">
          <div className="mt-2 flex flex-row text-sm justify-between gap-1">
            <h1>My Projects</h1>
            <button onClick={handleInput}>
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {openInput && (
              <div className="flex">
                <input
                  className="w-full border-b text-lg outline-none pb-1"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddProject();
                      handleInput();
                    }
                  }}
                />{" "}
                <button
                  onClick={() => {
                    handleAddProject();
                    handleInput();
                  }}
                  className="hover:bg-[#DC4C3E] px-1.5  text-xs rounded-full hover:text-white text-[#DC4C3E] bg-transparent"
                >
                   add
                </button>
              </div>
            )}
          </div>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Hash size={14} className="text-purple-600" />
              <span className="text-gray-700">{project.name}</span>
              {project.id === " " && (
                <span className="ml-auto text-xs text-gray-500">1</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
