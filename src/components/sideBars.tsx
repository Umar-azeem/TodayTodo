"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash,
  Ellipsis,
  Edit,
  ArrowDownToLine,
  ArrowUpToLine,
  Heart,
  CopyPlus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Popovers from "../components/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useProjectStore } from "@/state";
import CommandSearch from "./CommandSearch";
import Icon from "../../public/icon/icons";

export default function SideBars() {
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement | null>(null);

  const {
    projects,
    favorites,
    addProject,
    editProject,
    deleteProject,
    duplicateProject,
    toggleFavorite,
    moveUp,
    moveDown,
  } = useProjectStore();

  const favoriteProjects = projects.filter((p) => favorites.includes(p.id));

  const [showFavorites, setShowFavorites] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [openTaskInput, setOpenTaskInput] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  // const [openProjectModal, setOpenProjectModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [openProjectPopover, setOpenProjectPopover] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const { toggleSidebar } = useSidebar();
  // const saveProject = () => {
  //   if (!projectName.trim()) return;

  //   if (editId) {
  //     editProject(editId, projectName);
  //   } else {
  //     addProject({ id: crypto.randomUUID(), name: projectName });
  //   }

  //   setProjectName("");
  //   setEditId(null);
  //   setOpenProjectModal(false);
  // };
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
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popupRef.current &&
        e.target instanceof Node &&
        !popupRef.current.contains(e.target)
      ) {
        const target = e.target as HTMLElement;
        const isPopoverContent = target.closest("[data-radix-popover-content]");
        const isPopoverTrigger = target.closest("[data-radix-popover-trigger]");
        const isSelectContent = target.closest("[data-radix-select-content]");
        const isSelectTrigger = target.closest("[data-radix-select-trigger]");
        const isCommandItem = target.closest("[data-radix-command-item]");
        if (
          !isPopoverContent &&
          !isPopoverTrigger &&
          !isSelectContent &&
          !isSelectTrigger &&
          !isCommandItem
        ) {
          setOpenTaskInput(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {openTaskInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <Popovers handleClose={() => setOpenTaskInput(false)} />
          </div>
        </div>
      )}
      <div className="left-0 h-screen overflow-hidden">
        <Sidebar className="border-hidden ">
          <SidebarContent className="overflow-hidden">
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="pt-1.5 pl-1 flex items-center justify-between w-[210px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" className="pl-1">
                        <div className="flex justify-center items-center space-x-0.5">
                          <Image
                            src="/uma.jpg"
                            width={23}
                            height={23}
                            alt="Umar"
                            className="rounded-full"
                          />
                          <p className="text-xs pl-1.5">Umar</p>
                          <ChevronDown className="w-2 h-2 text-gray-400" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex justify-between items-center gap-3 ">
                    <Icon
                      name="bell"
                      className="w-[23px] h-[23px] text-gray-600 rounded-sm hover:bg-[#F2F0EE] "
                    />

                    <button
                      onClick={toggleSidebar}
                      className="hover:bg-[#F2F0EE] rounded-sm p-0.5"
                    >
                      <Icon name="openClose" className="w-6 h-6 text-black" />
                    </button>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="w-[224px]">
              <SidebarGroupContent>
                <SidebarMenu>
                  <div
                    className={`flex relative items-center justify-between cursor-pointer ${
                      pathname === "/search"
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      onClick={() => setOpenTaskInput(true)}
                      className="flex items-center w-full"
                    >
                      <Button
                        variant="default"
                        className="flex rounded-md flex-row text-sm items-center px-2 py-1  gap-1.5"
                      >
                        <Plus className="min-w-5 min-h-5 bg-[#D33327] text-white rounded-full p-0.5" />
                        <p className="text-[13px] font-semibold text-[#D33327]">
                          Add task
                        </p>
                      </Button>
                    </div>

                    <Icon
                      name="line"
                      className="w-[21px] h-[21px] text-[#D33327]"
                    />
                  </div>
                  <div className="space-y-1.5 pt-2 text-[]">
                    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
                      <DialogTrigger asChild>
                        <SidebarMenuItem
                          className={`flex items-center px-2 py-1 gap-1 cursor-pointer ${
                            pathname === "/search"
                              ? "bg-red-50 text-red-600"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          <Icon
                            name="search"
                            className="w-[21px] h-[21px] text-gray-700"
                          />
                          <p className="text-[13px]">Search</p>
                        </SidebarMenuItem>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl p-0 border-none">
                        <CommandSearch onClose={() => setOpenSearch(false)} />
                      </DialogContent>
                    </Dialog>

                    {/* inbox */}
                    <SidebarMenuItem
                      className={`flex items-center gap-2 px-2 py-1 text-sm rounded-md ${
                        pathname === "/inbox"
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Link
                        href="/inbox"
                        className="flex items-center gap-1 w-full"
                      >
                        <Icon name="inbox" className="w-[21px] h-[21px]" />
                        <span className="text-[13px]">Inbox</span>
                      </Link>
                    </SidebarMenuItem>

                    {/* TODAY */}
                    <SidebarMenuItem
                      className={`flex items-center text-sm px-2 py-1 gap-1 ${
                        pathname === "/today"
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon name="today" className="w-[21px] h-[21px] " />
                      <Dialog>
                        <Link
                          href="/today"
                          className="flex items-center gap-1 text-sm w-full"
                        >
                          <p className="text-[13px]">Today</p>
                        </Link>
                      </Dialog>
                    </SidebarMenuItem>

                    {/* UPCOMING */}
                    <SidebarMenuItem
                      className={`flex items-center text-sm px-2 py-1 gap-1 ${
                        pathname === "/upcoming"
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon name="upcoming" className="w-[21px] h-[21px]  " />
                      <Dialog>
                        <Link
                          href="/upcoming"
                          className="flex items-center gap-1 text-sm w-full"
                        >
                          <p className="text-[13px]">Upcoming</p>
                        </Link>
                      </Dialog>
                    </SidebarMenuItem>

                    {/* COMPLETED */}

                    <SidebarMenuItem
                      className={`flex items-center text-sm px-2 py-1 gap-1 ${
                        pathname === "/complete"
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon name="complete" className="w-[21px] h-[21px] " />
                      <Dialog>
                        <Link
                          href="/complete"
                          className="flex items-center gap-1 text-sm w-full"
                        >
                          <p className="text-[13px]">Completed</p>
                        </Link>
                      </Dialog>
                    </SidebarMenuItem>
                  </div>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between items-center">
                <p className="text-[13px]  font-samibold text-gray-400">
                  Favorites
                </p>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="pl-1"
                >
                  {showFavorites ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
                  )}
                </button>
              </SidebarGroupLabel>

              {showFavorites && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {favoriteProjects.map((project) => (
                      <SidebarMenuItem
                        key={project.id}
                        className={`flex flex-row items-center mx-1 rounded-md space-y-2 px-1 ${
                          pathname === "/project/${project.id}"
                            ? "bg-red-50 text-red-600"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <Link
                          href={`/project/${project.id}`}
                          className="flex items-center gap-1 my-1 text-sm w-full"
                        >
                          <Icon name="hash" className="w-[21px] h-[21px] " />

                          <p className="text-xs text-black">{project.name}</p>
                        </Link>

                        {/* FAVORITE MENU */}
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Ellipsis className="w-4 h-4 text-gray-400 cursor-pointer ml-auto" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-36 text-xs"
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
                              <ArrowUpToLine /> Move Up
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => moveDown(project.id)}
                            >
                              <ArrowDownToLine /> Move Down
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleFavorite(project.id)}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(project.id)
                                    ? "text-red-500"
                                    : ""
                                }`}
                              />
                              {favorites.includes(project.id)
                                ? "Remove Favorite"
                                : "Add Favorite"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => duplicateProject(project.id)}
                            >
                              <CopyPlus className="w-4 h-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between items-center">
                <Link
                  href="/myProject"
                  className={`flex items-center p-1 rounded-md ${
                    pathname === "/myPorject"
                      ? "bg-red-50 "
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <p className="text-[13px] font-samibold text-gray-400">
                    {" "}
                    My Projects{" "}
                  </p>{" "}
                </Link>

                <div className="flex gap-2 items-center">
                  <Plus
                    className="w-4 h-4 rounded-md text-gray-400 cursor-pointer"
                    onClick={() => {
                      setEditId(null);
                      setProjectName("");
                      setOpenProjectPopover(true);
                    }}
                  />
                  <button onClick={() => setShowProjects(!showProjects)}>
                    {showProjects ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
                    )}
                  </button>
                </div>
              </SidebarGroupLabel>
              {showProjects && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {projects.map((project) => (
                      <SidebarMenuItem
                        key={project.id}
                        className={`flex flex-row items-center mx-1 space-y-2 px-1 ${
                          pathname === "/project/${project.id}"
                            ? "bg-red-50 text-red-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Link
                          href={`/project/${project.id}`}
                          className="flex items-center text-sm gap-1 my-1 w-full "
                        >
                          <Icon name="hash" className="w-[21px] h-[21px] " />

                          <p className="text-xs text-black">{project.name}</p>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Ellipsis className="w-4 h-4 text-gray-400 cursor-pointer ml-auto" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-36 text-xs"
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
                              <ArrowUpToLine /> Move Up
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => moveDown(project.id)}
                            >
                              <ArrowDownToLine /> Move Down
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleFavorite(project.id)}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(project.id)
                                    ? "text-red-500"
                                    : ""
                                }`}
                              />
                              {favorites.includes(project.id)
                                ? "Remove Favorite"
                                : "Add Favorite"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => duplicateProject(project.id)}
                            >
                              <CopyPlus className="w-4 h-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          </SidebarContent>
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
        </Sidebar>
      </div>
    </>
  );
}
