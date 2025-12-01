 import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
}

export interface ProjectStore {
  projects: Project[];
  addProject: (p: Project) => void;
 
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [], 

      addProject: (p) =>
        set((state) => ({
          projects: [...state.projects, p],
        })),
        
    }),
    {
      name: "project-storage", 
    }
  )
);


interface Task {
  taskId: string;
  name: string;
  description: string;
  priority: string;
  dueDate: string;
  reminder: string;
  completed: boolean;
  createdAt: string;
  projectId:string
}

interface TodoStore {
  tasks: Task[];
  addTask: (t: Task) => void;  
  // updateTask: (id: number, updated: Partial<Task>) => void;
  // deleteTask: (id: number) => void;
  }

export const useTodoStore = create<TodoStore>()(
  persist(
    (set)=> ({
      tasks:[],
      addTask:(t)=>
        set((state)=>({
          tasks:[...state.tasks, t],
        }))
    }),
    {
      name:"task-storage",
    }
  )
);


