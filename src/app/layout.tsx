"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/sidebar";
import "./globals.css";
import { PanelRightClose } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <html lang="en">
      <body className="min-h-screen w-full flex flex-row relative">

        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        <AnimatePresence>
          {!isSidebarOpen && (
            <motion.button
              key="toggle-btn"
              onClick={toggleSidebar}
              className="fixed top-0.5 z-50 p-2  rounded-full"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 5, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <PanelRightClose className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
