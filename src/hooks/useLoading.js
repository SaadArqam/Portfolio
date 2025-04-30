"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Show loading animation when route changes
    handleStart();

    // Hide loading animation after a delay
    const timer = setTimeout(() => {
      handleComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return { isLoading };
}
