"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Define the page navigation order
const PAGES_ORDER = ["/", "/about", "/projects", "/contact"];

export function useScrollNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);
  const [navDirection, setNavDirection] = useState(null); // 'up' or 'down'

  useEffect(() => {
    // Show navigation indicator
    const showNavigationIndicator = (direction) => {
      setNavDirection(direction);

      // Create indicator element if it doesn't exist
      let indicator = document.getElementById("scroll-nav-indicator");
      if (!indicator) {
        indicator = document.createElement("div");
        indicator.id = "scroll-nav-indicator";
        indicator.style.position = "fixed";
        indicator.style.left = "0";
        indicator.style.right = "0";
        indicator.style.height = "4px";
        indicator.style.backgroundColor = "black";
        indicator.style.zIndex = "9999";
        indicator.style.transition = "transform 0.3s ease-out";
        document.body.appendChild(indicator);
      }

      // Position indicator based on direction
      if (direction === "up") {
        indicator.style.top = "0";
        indicator.style.bottom = "auto";
        indicator.style.transform = "scaleY(1)";
      } else {
        indicator.style.bottom = "0";
        indicator.style.top = "auto";
        indicator.style.transform = "scaleY(1)";
      }

      // Hide indicator after navigation
      setTimeout(() => {
        indicator.style.transform = "scaleY(0)";
        setNavDirection(null);
      }, 800);
    };

    // Debounce function to prevent multiple triggers
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    // Get current page index
    const getCurrentPageIndex = () => {
      return PAGES_ORDER.indexOf(pathname);
    };

    // Navigate to next page
    const navigateToNextPage = () => {
      const currentIndex = getCurrentPageIndex();
      if (currentIndex >= 0 && currentIndex < PAGES_ORDER.length - 1) {
        showNavigationIndicator("down");
        router.push(PAGES_ORDER[currentIndex + 1]);
      }
    };

    // Navigate to previous page
    const navigateToPrevPage = () => {
      const currentIndex = getCurrentPageIndex();
      if (currentIndex > 0) {
        showNavigationIndicator("up");
        router.push(PAGES_ORDER[currentIndex - 1]);
      }
    };

    // Handle wheel event for page navigation
    const handleWheel = debounce((e) => {
      if (isNavigating) return;

      // Scroll down - go to next page
      if (e.deltaY > 50) {
        setIsNavigating(true);
        navigateToNextPage();

        // Reset navigation state after a delay
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      }

      // Scroll up - go to previous page
      if (e.deltaY < -50) {
        setIsNavigating(true);
        navigateToPrevPage();

        // Reset navigation state after a delay
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      }
    }, 100);

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
      if (touchStartY === null || isNavigating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Swipe up - go to next page
      if (deltaY > 50) {
        setIsNavigating(true);
        navigateToNextPage();

        // Reset navigation state after a delay
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      }

      // Swipe down - go to previous page
      if (deltaY < -50) {
        setIsNavigating(true);
        navigateToPrevPage();

        // Reset navigation state after a delay
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      }

      // Reset touch state
      setTouchStartY(null);
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);

      // Remove indicator element if it exists
      const indicator = document.getElementById("scroll-nav-indicator");
      if (indicator) {
        indicator.remove();
      }
    };
  }, [router, isNavigating, touchStartY, pathname]);

  return null;
}
