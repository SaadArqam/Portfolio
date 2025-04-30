"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function AnimatedLayout({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="min-h-screen"
      >
        {/* Beautiful overlay effect */}
        <motion.div
          key={`overlay-${pathname}`}
          initial={{ scaleY: 1, originY: 0 }}
          animate={{
            scaleY: 0,
            originY: 0,
            transition: {
              duration: 0.7,
              ease: [0.65, 0, 0.35, 1],
            },
          }}
          exit={{
            scaleY: 0,
            originY: 1,
            transition: {
              duration: 0.7,
              ease: [0.65, 0, 0.35, 1],
            },
          }}
          className="fixed inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white/10 backdrop-blur-sm pointer-events-none z-[9999]"
          style={{ transformOrigin: "top" }}
        />

        {children}
      </motion.main>
    </AnimatePresence>
  );
}
