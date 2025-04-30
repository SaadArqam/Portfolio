"use client";

import { usePathname } from "next/navigation";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Define the page navigation order and names
const PAGES = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/projects", name: "Projects" },
  { path: "/contact", name: "Contact" },
];

export default function PageIndicator() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Find current page index
  const currentIndex = PAGES.findIndex((page) => page.path === pathname);

  // Show component after a short delay to avoid flashing during initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Hide if not on a known page
  if (currentIndex === -1 || !visible) {
    return null;
  }

  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage =
    currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <div className="fixed right-6 bottom-32 z-40 hidden md:block">
      <div className="flex flex-col items-end gap-2 font-mono text-xs">
        {prevPage && (
          <div className="flex items-center gap-1 text-gray-500 animate-pulse">
            <span>Scroll up for {prevPage.name}</span>
            <ChevronUpIcon className="w-4 h-4" />
          </div>
        )}

        <div className="text-black font-medium">
          {currentIndex + 1}/{PAGES.length} - {PAGES[currentIndex].name}
        </div>

        {nextPage && (
          <div className="flex items-center gap-1 text-gray-500 animate-pulse">
            <span>Scroll down for {nextPage.name}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
