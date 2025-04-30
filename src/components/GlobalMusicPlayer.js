"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  PauseIcon,
  PlayIcon,
  VolumeIcon,
  Volume2Icon,
  MusicIcon,
} from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";

const GlobalMusicPlayer = () => {
  const [showControls, setShowControls] = useState(false);
  const [prevPathname, setPrevPathname] = useState("/");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const {
    isPlaying,
    currentTime,
    duration,
    isMuted,
    shouldPlay,
    musicAvailable,
    setShouldPlay,
    togglePlay,
    setProgress,
    toggleMute,
    formatTime,
  } = useMusic();

  // Track previous pathname to detect navigation
  useEffect(() => {
    // Only set shouldPlay when navigating from home to another page
    if (
      prevPathname === "/" &&
      pathname !== "/" &&
      !isPlaying &&
      musicAvailable
    ) {
      setShouldPlay(true);
    }

    setPrevPathname(pathname);
  }, [pathname, prevPathname, isPlaying, musicAvailable, setShouldPlay]);

  // Auto-hide controls after 5 seconds of inactivity
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showControls]);

  // Calculate progress percentage
  const progressPercentage = (currentTime / duration) * 100 || 0;

  // Return null on home page - no player needed
  if (isHomePage) {
    return null;
  }

  // Display a message if music is not available
  if (!musicAvailable) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className="music-player-floating"
          title="Music file not found. Add an MP3 file at /public/music/background-music.mp3"
        >
          <MusicIcon className="h-5 w-5 text-white opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div
        className={`music-player-floating ${
          showControls ? "music-player-expanded" : ""
        }`}
      >
        <button
          className="music-toggle-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>

        {showControls && (
          <div className="music-controls-floating">
            <div className="progress-bar-floating">
              <div
                className="progress-filled-floating"
                style={{ width: `${progressPercentage}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => setProgress(parseFloat(e.target.value))}
                className="progress-slider-floating"
              />
            </div>

            <div className="time-display-floating">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <button
              className="mute-btn-floating"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeIcon className="h-4 w-4" />
              ) : (
                <Volume2Icon className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalMusicPlayer;
