"use client";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import Icon from "../../public/icon/icons";
//  import { usePathname } from "next/navigation";

import SideBars from "@/components/sideBars";
import CustomSidebarButton from "@/components/CustomSidebarButton";
interface LayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
  // const pathname = usePathname();
  //   const [showTitle, setShowTitle] = useState(false);

  // const getPageTitle = (pathname: string) => {
  //   if (pathname === "/inbox") return "Inbox";
  //   if (pathname === "/today") return "Today";
  //   if (pathname === "/upcoming") return "Upcoming";
  //   if (pathname === "/complete") return "Complete";
  //   return "";
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 10) {
  //       setShowTitle(true); // scroll down → show
  //     }  else {
  //       setShowTitle(false); // top → hide
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <html lang="en">
      <body className="max-h-screen w-full flex flex-row relative">
        <SidebarProvider>
          <div className="">
            <SideBars />
          </div>
          <main className="relative flex-1 w-full  ">
            {/* {showTitle && (
              <div className="sticky top-0 z-40 mx-auto w-full  border-b bg-white">
                <div className="flex items-center justify-between px-6 py-3">
                  <div className="flex flex-col items-center flex-1">
                    <h2 className="text-md font-bold text-black">
                      {getPageTitle(pathname)}
                    </h2>
                    <p className="text-xs text-gray-500"></p>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center gap-2 hover:bg-[#F1EFED] p-1.5 rounded-md font-semibold text-sm text-gray-600">
                        <Icon name="three-line" className="w-6 h-6" />
                        <span>Display: 3</span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-30 bg-black text-white p-2"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">List</h4>
                        <hr className="bg-gray-700" />
                        <p className="text-sm">Change layout & view ⇧ V</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )} */}
            <div className="absolute top-4 px-2 z-50">
              <CustomSidebarButton />
            </div>
            <div className="w-full "> {children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
