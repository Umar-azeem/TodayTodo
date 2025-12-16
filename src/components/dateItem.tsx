// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { CalendarIcon, Flag, AlarmClock, Inbox } from "lucide-react";

// import {
//   Command,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useOutsideClick } from "./useOutsideClick";
// import { useProjectStore } from "@/state";
// import { usePopUpLogic } from "./usePopUpLogic";
// import { useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import { threadId } from "worker_threads";

// interface PopUpProps {
//   selectedDate: Date;
//   handleClose: () => void;
//   handleTaskInput: () => void;
// }


// export default function PopUp({
//   selectedDate,
//   handleClose,
//   handleTaskInput,
// }: PopUpProps) {
//   const popupRef = useRef(null);
//   const [ref, inView]= useInView( {
//     threshold: 1,
//   });

//   useEffect(()=> {
//     if (inView &&  hasNextpage){
//       fetchNextPage();
//     }
//   }, [inView.fetchNextPage,hasNextPage]);

  

//   const {
//     date,
//     inputData,
//     description,
//     priority,
//     reminder,
//     setDate,
//     setInputData,
//     setDescription,
//     setPriority,
//     setReminder,
//     handleAddTask,
//   } = usePopUpLogic(selectedDate);
//   useOutsideClick(popupRef, handleClose);
//   const projects = useProjectStore((s) => s.projects);
//   const priorityColors: Record<string, string> = {
//     "Priority 1": "text-red-600",
//     "Priority 2": "text-orange-500",
//     "Priority 3": "text-blue-600",
//     "Priority 4": "text-gray-400",
//   };

//   return (
//     <div
//       ref={popupRef}
//       className="border rounded-xl p-4 bg-white shadow-lg w-full"
//     >
//       <input
//         placeholder="Task name"
//         className="w-full outline-none text-sm"
//         value={inputData}
//         onChange={(e) => setInputData(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             if (handleTaskInput) {
//               handleTaskInput();
//             }
//             handleAddTask();
//           }
//         }}
//       />

//       <textarea
//         placeholder="Description"
//         className="w-full text-sm mt-2 outline-none"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//            if (handleTaskInput) {
//               handleTaskInput();
//             }
//             handleAddTask();
//           }
//         }}
//       />

//       <div className="flex items-center gap-2 mt-2">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="flex gap-2 text-xs">
//               <CalendarIcon size={14} />
//               {date ? format(date, "PPP") : "Date"}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="p-2">
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={(d) => d && setDate(d)}
//             />
//           </PopoverContent>
//         </Popover>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="flex gap-2 text-xs items-center"
//             >
//               <Flag size={16} className={priorityColors[priority]} />
//               {priority}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <Command>
//               <CommandList>
//                 <CommandGroup>
//                   {["Priority 1", "Priority 2", "Priority 3", "Priority 4"].map(
//                     (p) => (
//                       <CommandItem key={p} onSelect={() => setPriority(p)}>
//                         {p}
//                       </CommandItem>
//                     )
//                   )}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button variant="outline" className="flex gap-2 text-xs">
//               <AlarmClock size={14} /> {reminder}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <Command>
//               <CommandList>
//                 <CommandGroup>
//                   {["No reminder", "Today 6pm", "Tomorrow 9am", "Custom"].map(
//                     (r) => (
//                       <CommandItem key={r} onSelect={() => setReminder(r)}>
//                         {r}
//                       </CommandItem>
//                     )
//                   )}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div className="mt-3">
//         <Select>
//           <SelectTrigger className="w-36">
//             <Inbox size={14} />
//           </SelectTrigger>
//           <SelectContent>
//             {projects.map((p) => (
//               <SelectItem key={p.id} value={p.id}>
//                 {p.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="flex justify-end gap-2 mt-4 ">
//         <Button variant="outline" onClick={handleTaskInput}>
//           Cancel
//         </Button>

//         <Button
//           onClick={() => {
//             handleTaskInput();
//             handleAddTask();
//           }}
//           className="bg-red-500 text-white"
//         >
//           Add Task
//         </Button>
//       </div>
//     </div>
//   );
