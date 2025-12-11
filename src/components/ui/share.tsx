"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function ShareButton() {
  const pathname = usePathname();
  const fullUrl = typeof window !== "undefined" 
    ? window.location.origin + pathname 
    : "";
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copyLink}
      className="p-2 text-sm bg-gray-100 rounded-md"
    >
      {copied ? "Copied!" : "Copy Share Link"}
    </button>
  );
}
