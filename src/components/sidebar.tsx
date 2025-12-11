"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  Hash,
  Trash,
  Ellipsis,
  Edit,
  ArrowDownToLine,
  ArrowUpToLine,
  Heart,
  CopyPlus,
  UserRoundPlus,
  PanelRightClose,
} from "lucide-react";
import { useProjectStore } from "@/state";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PopUp from "./popUp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};
export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const projects = useProjectStore((state) => state.projects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const editProject = useProjectStore((state) => state.editProject);
  const addProject = useProjectStore((state) => state.addProject);
  const [newProjectName, setNewProjectName] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [openProjectPopover, setOpenProjectPopover] = useState(false);
  const [openTaskInput, setOpenTaskInput] = useState(false);
  const moveUp = useProjectStore((s) => s.moveUp);
  const moveDown = useProjectStore((s) => s.moveDown);
  const { favorites, toggleFavorite } = useProjectStore();
  const [copied, setCopied] = useState(false);
  const duplicateProject = useProjectStore((s) => s.duplicateProject);

  const popupRef = useRef(null);

  const handleTaskInput = () => setOpenTaskInput(true);
  const handleClosePopup = () => setOpenTaskInput(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenTaskInput(false);
      }
    }
    if (openTaskInput)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openTaskInput]);
  const saveProject = () => {
    if (!newProjectName.trim()) return;
    if (editProjectId) {
      editProject(editProjectId, newProjectName);
    } else {
      addProject({
        id: crypto.randomUUID(),
        name: newProjectName,
      });
    }
    setEditProjectId(null);
    setNewProjectName("");
    setOpenProjectPopover(false);
  };
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const fullUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <>
      {openTaskInput && (
        <div className="absolute h-screen flex justify-center items-center z-50 w-full">
          <div ref={popupRef} className="w-full max-w-lg flex justify-center">
            <PopUp selectedDate={null} handleClose={handleClosePopup} />
          </div>
        </div>
      )}
      <motion.div
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative top-0 left-0 w-64  border-r h-screen bg-white shadow-lg z-40 md:relative md:translate-x-0"
      >
        <div>
          {isOpen && (
            <button
              onClick={closeSidebar}
              className="flex items-end w-full mt-2 pr-2  justify-end"
            >
              <PanelRightClose className="w-5 h-5" />
            </button>
          )}
          <div className="relative w-60 h-full  bg-white px-4 flex flex-col text-sm">
            <button
              onClick={handleTaskInput}
              className="flex items-center gap-2 text-red-600 font-medium hover:bg-gray-100 rounded-md"
            >
              <Link href="" className="flex items-center gap-2 p-2 rounded-md">
                <Plus size={18} /> Add task
              </Link>
            </button>
            <Link
              href="/search"
              onClick={handleLinkClick}
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/search"
                  ? "bg-red-50 text-red-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Search size={18} /> Search
            </Link>
            <Link
              href="/today"
              onClick={handleLinkClick}
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/today"
                  ? "bg-red-50 text-red-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <CalendarDays size={18} /> Today
            </Link>
            <Link
              href="/upcoming"
              onClick={handleLinkClick}
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/upcoming"
                  ? "bg-red-50 text-red-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <CalendarRange size={18} /> Upcoming
            </Link>
            <Link
              href="/complete"
              onClick={handleLinkClick}
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/complete"
                  ? "bg-red-50 text-red-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <CheckCircle2 size={14} /> Completed
            </Link>
            <div className="relative mt-6 font-medium text-gray-500">
              <div className="mt-2 flex flex-row text-sm justify-between gap-1">
                <h1 className="text-xs">My Projects</h1>
                <Plus
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setEditProjectId(null);
                    setNewProjectName("");
                    setOpenProjectPopover(true);
                  }}
                />
                {openProjectPopover && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                      onClick={() => {
                        setOpenProjectPopover(false);
                        setEditProjectId(null);
                        setNewProjectName("");
                      }}
                    ></div>
                    <div className="relative w-80 bg-white shadow-xl border rounded-2xl p-5 z-50 animate-fadeIn">
                      <div className="grid gap-4">
                        <h4 className="font-semibold text-gray-800">
                          {editProjectId ? "Edit Project" : "Add Project"}
                        </h4>
                        <input
                          className="w-full border-b text-sm outline-none pb-1"
                          placeholder="Project name"
                          value={newProjectName}
                          onChange={(e) => setNewProjectName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveProject()}
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => {
                              setOpenProjectPopover(false);
                              setEditProjectId(null);
                              setNewProjectName("");
                            }}
                            className="px-3 py-1 text-xs rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={saveProject}
                            className="px-3 py-1 text-xs rounded-full text-white bg-red-500 hover:bg-red-600"
                          >
                            {editProjectId ? "Save" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 p-1 rounded-md"
                >
                  <Link
                    href={`/project/${project.id}`}
                    className={`flex items-center font-light text-xs gap-2 w-full rounded-md ${
                      pathname === `/project/${project.id}`
                        ? "bg-red-50 text-red-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Hash
                      size={14}
                      className={`${
                        pathname === `/project/${project.id}`
                          ? "text-red-600"
                          : "text-purple-600"
                      }`}
                    />
                    <div className="flex justify-between w-full">
                      <span>{project.name}</span>
                      {favorites.includes(project.id) && (
                        <Image
                          height={10}
                          width={10}
                          src="/icon/heart.svg"
                          className="w-5 h-5  text-red-500"
                          alt="heart"
                        />
                      )}
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className="w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36 text-xs" align="start">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditProjectId(project.id);
                          setNewProjectName(project.name);
                          setOpenProjectPopover(true);
                        }}
                      >
                        <Edit className="mr-2 w-4 h-4" /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem onSelect={() => moveUp(project.id)}>
                        <ArrowUpToLine /> Add project above
                      </DropdownMenuItem>

                      <DropdownMenuItem onSelect={() => moveDown(project.id)}>
                        <ArrowDownToLine /> Add project down
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <button
                          onClick={() => toggleFavorite(project.id)}
                          className="flex gap-2 items-center"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(project.id)
                                ? "text-red-500"
                                : ""
                            }`}
                          />
                          {favorites.includes(project.id)
                            ? "Remove favorite"
                            : "Add to favorites"}
                        </button>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={() => duplicateProject(project.id)}
                      >
                        <CopyPlus className="w-4 h-4" /> Duplicate
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <button
                          onClick={copyLink}
                          className=" flex gap-2 text-xs bg-gray-100 rounded-md"
                        >
                          <UserRoundPlus className="w-4 h-4" />
                          {copied ? "Copied!" : "Copy Share Link"}
                        </button>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <button
                          className="flex gap-1 text-center justify-center"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash className="w-4 h-4" /> Delete
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      {copied && (
        <div className="absolute z-40 bottom-4 left-4 bg-gray-600 text-white   text-xs px-4 py-1  md:text-md :md:px-16 md:py-3 rounded-md shadow-md animate-fade-in">
          Link Copied!
        </div>
      )}
    </>
  );
}
