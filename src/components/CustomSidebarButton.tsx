"use client";

import Icon from "../../public/icon/icons";
import { useSidebar } from "@/components/ui/sidebar";

export default function CustomSidebarButton() {
  const { open, toggleSidebar } = useSidebar();

  if (open) return null;

  return (
    <button
      onClick={toggleSidebar}
      className=""
    >
      <Icon
        name="openClose"
        className="w-6 h-6 text-black"
      />
    </button>
  );
}
