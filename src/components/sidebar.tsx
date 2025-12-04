"use client";
import Link from "next/link";
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
} from "lucide-react";
import { useProjectStore } from "@/state";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PopUp from "./popUp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Sidebar() {
  const pathname = usePathname(); 
  const projects = useProjectStore((state) => state.projects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const [openInput, setOpeninput] = useState(false);
  const [openTaskInput, setOpenTaskInput] = useState(false);
  // const [openProInput, setOpenProInput] = useState(false);

  const popupRef = useRef(null);

  // const handleProInput = () => {
  //   setOpenProInput(!openProInput);
  // };

  const handleTaskInput = () => {
    setOpenTaskInput(!openTaskInput);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenTaskInput(false);
      }
    }

    if (openTaskInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTaskInput]);

  const handleInput = () => setOpeninput(!openInput);

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

  return (
    <div>
      {openTaskInput && (
        <div className="absolute h-screen flex justify-center items-center z-40 w-full">
          <div
            ref={popupRef}
            className="w-full max-w-lg flex justify-center items-center"
          >
            <PopUp handleTaskInput={handleTaskInput} />
          </div>
        </div>
      )}

      <div className="relative w-64 h-screen border-r bg-white p-4 flex flex-col text-sm">
        <button
          onClick={handleTaskInput}
          className={`flex items-center gap-2 text-red-600 font-medium hover:bg-gray-100 rounded-md`}
        >
          <Link href="" className="flex items-center gap-2 p-2 rounded-md ">
            <Plus size={18} /> Add task
          </Link>
        </button>

        <Link
          href="/search"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${
              pathname === "/search"
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }
          `}
        >
          <Search size={18} /> Search
        </Link>

        {/* <Link
          href="/inbox"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${pathname === "/inbox" ? "bg-red-50 text-red-600" : "hover:bg-gray-100"}
          `}
        >
          <Inbox size={18} /> Inbox
          <span className="ml-auto text-xs text-gray-500">4</span>
        </Link> */}

        <Link
          href="/today"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${
              pathname === "/today"
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }
          `}
        >
          <CalendarDays size={18} /> Today
        </Link>

        <Link
          href="/upcoming"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${
              pathname === "/upcoming"
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }
          `}
        >
          <CalendarRange size={18} /> Upcoming
        </Link>

        {/* <Link
          href="/filters-labels"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${pathname === "/filters-labels" ? "bg-red-50 text-red-600" : "hover:bg-gray-100"}
          `}
        >
          <Filter size={18} /> Filters & Labels
        </Link> */}

        <Link
          href="/complete"
          className={`flex items-center gap-2 p-2 rounded-md 
            ${
              pathname === "/complete"
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100"
            }
          `}
        >
          <CheckCircle2 size={14} /> Completed
        </Link>
        <div className="relative mt-6 font-medium text-gray-500">
         

          <div className="mt-2 flex flex-row text-sm justify-between gap-1">
            <h1>My Projects</h1>
            <Popover>
            <PopoverTrigger asChild>
              <Plus className="w-5 h-5" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Projects add</h4>
                  <p className="text-muted-foreground text-sm">
                    Set the Project name.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex">
                <input
                  className="w-full border-b text-sm outline-none pb-1"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddProject();
                      handleInput();
                    }
                  }}
                />
                <button
                  onClick={() => {
                    handleAddProject();
                    handleInput();
                  }}
                  className="hover:bg-[#DC4C3E] px-1 text-xs rounded-full hover:text-white text-[#DC4C3E]"
                >
                  add
                </button>
              </div>
                  
                </div>
              </div>
            </PopoverContent>
          </Popover>
          </div>


          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer 
                ${
                  pathname === `/project/${project.id}`
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <div className="flex flex-row items-center gap-1 w-full">
                <Hash
                  size={14}
                  className={`${
                    pathname === `/project/${project.id}`
                      ? "text-red-600"
                      : "text-purple-600"
                  }`}
                />
                <span>{project.name}</span>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="border-hidden">
                    <Ellipsis className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Edit/>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Invite users
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        className="flex gap-1 text-center justify-center"
                        onClick={() => {
                          deleteProject(project.id);
                        }}
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
