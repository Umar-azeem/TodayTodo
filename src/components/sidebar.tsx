"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "../../public/icon/icon";
import { Button } from "@/components/ui/button";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Hash,
  Trash,
  Ellipsis,
  Edit,
  ArrowDownToLine,
  ArrowUpToLine,
  Heart,
  CopyPlus,
  UserRoundPlus,
  ChevronDown,
  ChevronRight,
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
import CommandSearch from "./CommandSearch";
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
  const [showFavorites, setShowFavorites] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const duplicateProject = useProjectStore((state) => state.duplicateProject);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const favoriteProjects = projects.filter((p) => favorites.includes(p.id));
  const handleTaskInput = () => setOpenTaskInput(true);
  const handleClosePopup = () => setOpenTaskInput(false);
  const [openSearch, setOpenSearch] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        event.target instanceof Node &&
        !popupRef.current.contains(event.target)
      ) {
        setOpenTaskInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
            <PopUp
              handleClose={handleClosePopup}
              handleTaskOpen={handleTaskInput}
            />
          </div>
        </div>
      )}
      <motion.div
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="relative  left-0 w-64 p-0.5  h-screen  bg-[#FCFAF8] shadow-lg z-50 md:relative md:translate-x-0"
      >
        <div className="flex justify-between w-full p-1 items-center ">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="flex text-[13px]  font-semibold items-center justify-center  bg-[#FCFAF8]  hover:bg-gray-100 h-10 border-hidden gap-2 "
                >
                  <Image
                    width={22}
                    height={22}
                    src="/umar.jpeg"
                    alt="Umar"
                    className="w-6 h-6 rounded-full"
                  />
                  Umar
                  <ChevronDown
                    className="w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowFavorites(false)}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Umar</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>{" "}
          <div className="flex items-center justify-center gap-2 ">
            <Icon
              name="bill"
              className="w-8 h-8 font-extralight text-gray-400"
            />
            {isOpen && (
              <button
                onClick={closeSidebar}
                className="flex items-end justify-center"
              >
                <Icon
                  name="openClose"
                  className="w-8 h-8 font-light  text-gray-400"
                />
              </button>
            )}
          </div>
        </div>
        <div className="relative w-full px-4 py-1">
          <div className="relative w-full h-full bg-[#FCFAF8] flex flex-col text-sm">
            <button
              onClick={handleTaskInput}
              className="flex items-center justify-between p-1  rounded-md hover:bg-gray-100"
            >
              <Link href="" className="flex items-center gap-3">
                <Plus className="w-5 h-5 bg-[#D33327] text-white rounded-full p-0.5" />
                <p className="text-sm font-medium text-[#A81F00]">Add task</p>
              </Link>

              <Icon name="line" className="w-7 h-7 text-[#D33327]" />
            </button>
            <div className="relative text-sm">
              <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                <DialogTrigger asChild>
                  <button
                    className={`flex items-center w-full p-1 rounded-md ${
                      pathname === "/search"
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon name="search" className="w-8 h-8 text-gray-600" />
                    <p className="h-7 ">Search</p>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-3xl p-0 border-none">
                  <CommandSearch onClose={() => setOpenSearch(false)} />
                </DialogContent>
              </Dialog>
              <Link
                href="/today"
                onClick={handleLinkClick}
                className={`flex items-center text-center  p-1 rounded-md ${
                  pathname === "/today"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon name="Today" className="w-8 h-8 text-gray-600" />
                <p className="h-7"> Today</p>
              </Link>

              <Link
                href="/upcoming"
                onClick={handleLinkClick}
                className={`flex items-center  p-1 rounded-md ${
                  pathname === "/upcoming"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon name="Upcoming" className="w-8 h-8 text-gray-600" />
                <p className="h-7">Upcoming</p>
              </Link>

              <Link
                href="/complete"
                onClick={handleLinkClick}
                className={`flex items-center  p-1 rounded-md ${
                  pathname === "/complete"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon name="checkCircle" className="w-8 h-8 text-gray-600" />
                <p className="h-7">Completed</p>
              </Link>
            </div>
            <div className="relative mt-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-gray-500 group">
                  <h1 className="font-semibold">Favorites</h1>

                  {showFavorites ? (
                    <ChevronDown
                      className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                      onClick={() => setShowFavorites(false)}
                    />
                  ) : (
                    <ChevronRight
                      className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                      onClick={() => setShowFavorites(true)}
                    />
                  )}
                </div>

                {showFavorites && favoriteProjects.length > 0 && (
                  <div>
                    {favoriteProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/project/${project.id}`}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-2 p-2 text-xs rounded-md ${
                          pathname === `/project/${project.id}`
                            ? " text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Hash size={14} className="font-thin text-gray-500" />
                        <span className="flex-1">{project.name}</span>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Ellipsis className="w-4 h-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-36 text-xs"
                            align="start"
                          >
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

                            <DropdownMenuItem
                              onSelect={() => moveUp(project.id)}
                            >
                              <ArrowUpToLine /> Add project above
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={() => moveDown(project.id)}
                            >
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
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative mt-2">
              <div className="mt-2 flex flex-col gap-1">
                {/* Header */}
                <div
                  className={`flex items-center justify-between  p-1 rounded-md ${
                    pathname === "/myPorject"
                      ? "bg-red-50 "
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {" "}
                  <Link
                    href="/myProject"
                    className={`flex items-center  p-1 rounded-md ${
                      pathname === "/myPorject"
                        ? "bg-red-50 "
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <h1 className="font-semibold">My Projects</h1>
                  </Link>
                  <div className="flex gap-2 items-center text-gray-500 group">
                    <Plus
                      className="w-4 h-4 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                      onClick={() => {
                        setEditProjectId(null);
                        setNewProjectName("");
                        setOpenProjectPopover(true);
                      }}
                    />

                    {showProjects ? (
                      <ChevronDown
                        className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                        onClick={() => setShowProjects(false)}
                      />
                    ) : (
                      <ChevronRight
                        className="w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                        onClick={() => setShowProjects(true)}
                      />
                    )}
                  </div>
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
                            onKeyDown={(e) =>
                              e.key === "Enter" && saveProject()
                            }
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

                {showProjects &&
                  projects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2  rounded-md"
                    >
                      <Link
                        href={`/project/${project.id}`}
                        className={`flex items-center gap-2 w-full py-2.5 px-3 rounded-md ${
                          pathname === `/project/${project.id}`
                            ? "bg-red-50 text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Hash
                          size={14}
                          className={`${
                            pathname === `/project/${project.id}`
                              ? "text-gray-500"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="flex justify-between  w-full">
                          <span>{project.name}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Ellipsis className="w-4 h-4 cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="w-36 text-xs"
                              align="start"
                            >
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

                              <DropdownMenuItem
                                onSelect={() => moveUp(project.id)}
                              >
                                <ArrowUpToLine /> Add project above
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onSelect={() => moveDown(project.id)}
                              >
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
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
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
