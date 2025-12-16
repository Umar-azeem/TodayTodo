import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
}

export interface ProjectStore {
  projects: Project[];
  favorites: string[];
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  editProject: (id: string, newName: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  toggleFavorite: (id: string) => void;
  duplicateProject: (id: string) => void;
}

const moveItem = <T>(list: T[], from: number, to: number): T[] => {
  const updated = [...list];
  const item = updated.splice(from, 1)[0];
  updated.splice(to, 0, item);
  return updated;
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      favorites: [],
      addProject: (p) =>
        set((state) => ({
          projects: [...state.projects, p],
        })),
      deleteProject: (id: string) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      editProject: (id: string, newName: string) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, name: newName } : project
          ),
        })),
      moveUp: (id) =>
        set((state) => {
          const index = state.projects.findIndex((p) => p.id === id);
          if (index <= 0) return {};
          return { projects: moveItem(state.projects, index, index - 1) };
        }),
      moveDown: (id) =>
        set((state) => {
          const index = state.projects.findIndex((p) => p.id === id);
          if (index === state.projects.length - 1) return {};
          return { projects: moveItem(state.projects, index, index + 1) };
        }),
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
      duplicateProject: (id: string) =>
        set((state) => {
          const projectToCopy = state.projects.find((p) => p.id === id);
          if (!projectToCopy) return {};

          const newProject = {
            id: crypto.randomUUID(),
            name: projectToCopy.name + " (Copy)",
          };

          return {
            projects: [...state.projects, newProject],
          };
        }),
    }),
    { name: "project-storage" }
  )
);

export interface Task {
  taskId: string;
  name: string;
  description: string;
  priority: string;
  dueDate: string;
  reminder: string;
  completed: boolean;
  createdAt: string;
  projectId: string;
}

interface TodoStore {
  tasks: Task[];
  addTask: (t: Task) => void;
  updateTask: (editTaskId: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (t) => set((state) => ({ tasks: [...state.tasks, t] })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.taskId !== id),
        })),
      completeTask: (editTaskId: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.taskId === editTaskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
      updateTask: (editTaskId, updated) =>
        set((state) => {
          console.log("Update called for ID:", editTaskId);
          console.log("Updated data:", updated);
          return {
            tasks: state.tasks.map((task) =>
              task.taskId === editTaskId ? { ...task, ...updated } : task
            ),
          };
        }),
    }),
    { name: "task-storage" }
  )
);
