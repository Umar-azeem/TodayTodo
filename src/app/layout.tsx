"use client";
import Icon from "../../public/icon/icon";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/sidebar";
import "./globals.css";
interface LayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <html lang="en">
      <body className="max-h-screen w-full flex flex-row relative">
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? 240 : 0 }}
          transition={{ duration: 0.3 }}
          className=""
        >
        <div className="">
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
          </div>
        </motion.div>

        <AnimatePresence>
          {!isSidebarOpen && (
            <motion.button
              key="toggle-btn"
              onClick={toggleSidebar}
              className="fixed top-2 left-2 z-50 p-0.5 bg-white"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 5, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Icon
                name="openClose"
                className="w-8 h-8 font-light  text-gray-400"
              />{" "}
            </motion.button>
          )}
        </AnimatePresence>

        <main className=" flex-1 w-full p-6 md:p-0.5 ">{children}</main>
      </body>
    </html>
  );
}
