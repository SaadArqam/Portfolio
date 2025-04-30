"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransitionEffect() {
  const pathname = usePathname();

  useEffect(() => {
    // Apply a subtle fade-in effect when navigating
    const main = document.documentElement;

    main.style.opacity = "0.97";
    main.style.transition = "opacity 0.2s ease-in-out";

    const timeout = setTimeout(() => {
      main.style.opacity = "1";
    }, 20);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null; // This component doesn't render anything
}
