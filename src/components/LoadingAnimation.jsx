"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlameIcon } from "lucide-react";

export default function LoadingAnimation({ isLoading = false }) {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    // If loading is true, show immediately
    if (isLoading) {
      setVisible(true);
    }
    // If loading is false, delay hiding to finish animation
    else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible && !isLoading) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-[100]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Spinning vinyl record effect */}
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-black flex items-center justify-center"
              animate={{
                rotate: 360,
                backgroundImage: [
                  "linear-gradient(0deg, #f5f5f5, #ffffff)",
                  "linear-gradient(360deg, #f5f5f5, #ffffff)",
                ],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                backgroundImage: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <motion.div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center text-white">
                <FlameIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="mt-6 text-sm sm:text-base font-medium tracking-wider uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ fontFamily: "var(--font-dela-gothic)" }}
            >
              Loading
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                ...
              </motion.span>
            </motion.div>

            {/* Subtle particles */}
            <div className="absolute">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-300 rounded-full"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
