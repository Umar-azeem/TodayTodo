 import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Project {
  id: string;
  name: string;
}
export interface ProjectStore {
  projects: Project[];
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
}
export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [], 
      addProject: (p) =>
        set((state) => ({
          projects: [...state.projects, p],
        })),
        deleteProject: (id:string)=>
          set((state)=> ({
            projects:state.projects.filter((project)=> project.id !== id)
          }))
    }),
    {
      name: "project-storage", 
    }
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
  projectId:string
}
interface TodoStore {
  tasks: Task[];
  addTask: (t: Task) => void;  
  updateTask: (id: string, updated: Partial<Task>) => void
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;  

  }
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (t) =>
        set((state) => ({
          tasks: [...state.tasks, t],
        })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.taskId !== id),
        })),
      completeTask: (id :string) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.taskId === id ? { ...task, completed: !task.completed } : task
    ),})),
          updateTask:(id:string , updated: Partial<Task>)=> {
            set((state)=> ({
              tasks:state.tasks.map((task) =>
                task.taskId === id ? {...task, ...updated}: task 
            ),
            }))
          }
    }),
    {
      name: "task-storage",
    }
  )
);

