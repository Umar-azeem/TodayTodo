// import CommandSearch from "@/components/CommandSearch";
 import CommandSearch from "@/components/CommandSearch";
import React from "react";

function Page() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="relative flex justify-center items-center w-full  shadow-lg max-w-3xl">
           <CommandSearch />
        </div>
      </div>
    </>
  );
}

export default Page;
