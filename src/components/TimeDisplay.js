"use client";

import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Initial time set
    updateTime();

    // Update time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    // Create date object for current time
    const now = new Date();

    // Convert to Pune time (IST, UTC+5:30)
    const puneOptions = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    // Format the time specifically for Pune
    const formattedTime = now.toLocaleTimeString("en-US", puneOptions);
    setCurrentTime(formattedTime);
  };

  return <span className="text-2xl font-semibold">{currentTime}</span>;
}
