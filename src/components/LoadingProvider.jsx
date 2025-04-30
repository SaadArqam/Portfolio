"use client";

import React from "react";
import useLoading from "@/hooks/useLoading";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function LoadingProvider({ children }) {
  const { isLoading } = useLoading();

  return (
    <>
      <LoadingAnimation isLoading={isLoading} />
      <div
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
