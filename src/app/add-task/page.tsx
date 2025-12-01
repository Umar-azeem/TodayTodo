"use client"

import PopUp from "@/components/popUp";

// import PopUp from "@/components/popUp";
// // InboxEmpty.jsx
// import React from "react";

export default function Page() {
  return (
    
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-lg font-semibold mb-2">Capture now, plan later</h2>

      <p className="text-gray-500 mb-4">
        Inbox is your go-to spot for quick task entry. Clear your mind now,
        organize when you’re ready.
      </p>
<div className='relative flex justify-center items-center w-full '>

     <PopUp/>
    </div>
      <button
        onClick={onAddTask}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <span className="text-xl font-bold">+</span> Add task
      </button>
    </div>
  );
}
