"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay initialization to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      // Hide the default cursor
      document.body.style.cursor = "none";

      // Check if there's already a cursor position
      if (position.x === 0 && position.y === 0) {
        // Set initial position to center of viewport
        setPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });
      }

      setVisible(true);
    }, 200);

    // Movement handler
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Click handlers
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Hover handlers for interactive elements
    const handleLinkHoverEnter = () => setLinkHovered(true);
    const handleLinkHoverLeave = () => setLinkHovered(false);

    // Event listeners
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverEnter);
      el.addEventListener("mouseleave", handleLinkHoverLeave);
    });

    // Clean up
    return () => {
      clearTimeout(initTimeout);
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverEnter);
        el.removeEventListener("mouseleave", handleLinkHoverLeave);
      });
    };
  }, [position.x, position.y]);

  // Calculate styles with explicit values
  const innerCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : 1})`,
    opacity: visible ? 1 : 0,
    transition: "transform 0.15s ease-out",
    pointerEvents: "none",
    position: "fixed",
    width: "10px",
    height: "10px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    zIndex: 99999,
    mixBlendMode: "exclusion",
    filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))",
  };

  const outerCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${clicked ? 1.2 : 1})`,
    width: linkHovered ? "50px" : "40px",
    height: linkHovered ? "50px" : "40px",
    backgroundColor: linkHovered ? "rgba(255, 255, 255, 0.3)" : "transparent",
    opacity: visible ? 1 : 0,
    transition:
      "transform 0.2s ease-out, width 0.2s, height 0.2s, background-color 0.2s",
    pointerEvents: "none",
    position: "fixed",
    border: "3px solid #fff",
    borderRadius: "50%",
    zIndex: 99999,
    mixBlendMode: "exclusion",
    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
  };

  return (
    <>
      <div style={outerCursorStyle} />
      <div style={innerCursorStyle} />
    </>
  );
};

export default CustomCursor;
