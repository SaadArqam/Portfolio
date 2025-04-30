"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Define the page order
const PAGES = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/projects", name: "Projects" },
  { path: "/contact", name: "Contact" },
];

export default function PageDots() {
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

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-3">
        {PAGES.map((page, index) => (
          <div
            key={page.path}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-black w-3 h-3" : "bg-gray-300"
            }`}
            title={page.name}
          />
        ))}
      </div>
    </div>
  );
}
