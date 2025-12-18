"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
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
} from "lucide-react";

import { useProjectStore } from "@/state";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MainProjects() {
  const pathname = usePathname();
  const {
    projects,
    deleteProject,
    moveUp,
    moveDown,
    favorites,
    toggleFavorite,
    duplicateProject,
    addProject,
    editProject,
  } = useProjectStore();

  const [enabled, setEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [copied, setCopied] = useState(false);

  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [openProjectPopover, setOpenProjectPopover] = useState(false);

  const filteredProjects = useMemo(() => {
    if (enabled) return [];

    const list = projects.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (searchText.trim()) return list;
    return list.slice(-5).reverse();
  }, [projects, searchText, enabled]);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/project/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
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

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-lg font-bold mb-1">My Projects</h1>
      <p className="text-sm text-gray-500 mb-4">Free</p>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Search projects"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500">
            <Label htmlFor="archived">Archived projects only</Label>
            <Switch
              id="archived"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          <button
            className="flex items-center gap-1 bg-gray-100 px-1.5 py-1 rounded"
            onClick={() => {
              setEditProjectId(null); 
              setNewProjectName("");
              setOpenProjectPopover(true);
            }}
          >
            <Plus size={16} />
            Add
            <ChevronDown className="w-5 h-5" />
          </button>

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
      </div>

      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        {filteredProjects.length} Projects
      </h4>
      <hr />
      {filteredProjects.length === 0 ? (
        <p className="text-gray-400 text-sm">No projects found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredProjects.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative flex items-center gap-2 w-full px-2 rounded-md ${
                pathname === `/project/${project.id}`
                  ? "bg-red-50 text-red-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Link
                href={`/project/${project.id}`}
                className={`relative flex items-center gap-2 w-full py-2 px-3 rounded-md ${
                  pathname === `/project/${project.id}`
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Hash size={14} className="text-gray-500" />

                <div className="flex justify-between w-full items-center">
                  <span>{project.name}</span>
                </div>
              </Link>
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis className="w-4 h-4 cursor-pointer" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-40 text-xs" align="start">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => moveUp(project.id)}>
                      <ArrowUpToLine className="w-4 h-4 mr-2" />
                      Move up
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => moveDown(project.id)}>
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Move down
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => toggleFavorite(project.id)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          favorites.includes(project.id) ? "text-red-500" : ""
                        }`}
                      />
                      {favorites.includes(project.id)
                        ? "Remove favorite"
                        : "Add favorite"}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => duplicateProject(project.id)}
                    >
                      <CopyPlus className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => copyLink(project.id)}>
                      <UserRoundPlus className="w-4 h-4 mr-2" />
                      {copied ? "Copied!" : "Copy link"}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => deleteProject(project.id)}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MainProjects;
