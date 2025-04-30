"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { PauseIcon, PlayIcon, VolumeIcon, Volume2Icon } from "lucide-react";

// Global variable to track if the user has interacted with the page
if (typeof window !== "undefined") {
  window.userHasInteracted = window.userHasInteracted || false;
}

const PersistentAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [userInteractionNeeded, setUserInteractionNeeded] = useState(false);

  const audioRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const prevPathRef = useRef(pathname);

  // Setup audio element and global user interaction detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Setup user interaction detection
    const markUserInteraction = () => {
      window.userHasInteracted = true;

      // Try to play audio if we were waiting for user interaction
      if (audioRef.current && userInteractionNeeded && !isHomePage) {
        audioRef.current
          .play()
          .then(() => {
            setUserInteractionNeeded(false);
            setIsPlaying(true);
            localStorage.setItem("musicPlaying", "true");
          })
          .catch((e) => console.error("Still could not play audio:", e));
      }

      // Remove listeners after first interaction
      document.removeEventListener("click", markUserInteraction);
      document.removeEventListener("touchstart", markUserInteraction);
      document.removeEventListener("keydown", markUserInteraction);
    };

    // Add listeners for user interaction
    document.addEventListener("click", markUserInteraction);
    document.addEventListener("touchstart", markUserInteraction);
    document.addEventListener("keydown", markUserInteraction);

    // Setup audio element if it doesn't exist yet
    if (!window.persistentAudio) {
      const audio = new Audio("/music/background-music.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      window.persistentAudio = audio;
      audioRef.current = audio;

      // Add event listeners
      audio.addEventListener("play", () => {
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
        localStorage.setItem("musicPlaying", "false");
      });

      audio.addEventListener("canplaythrough", () => {
        setIsVisible(true);

        // Try to play if we're not on the homepage and should be playing
        if (
          !isHomePage &&
          localStorage.getItem("musicPlaying") !== "false" &&
          window.userHasInteracted
        ) {
          audio.play().catch((error) => {
            console.warn("Autoplay prevented, need user interaction:", error);
            setUserInteractionNeeded(true);
          });
        }
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        setIsVisible(false);
      });

      setAudioElement(audio);
    } else {
      // If audio already exists, just reference it
      audioRef.current = window.persistentAudio;
      setAudioElement(window.persistentAudio);
      setIsPlaying(!window.persistentAudio.paused);
      setIsVisible(true);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("click", markUserInteraction);
      document.removeEventListener("touchstart", markUserInteraction);
      document.removeEventListener("keydown", markUserInteraction);
    };
  }, [isHomePage, userInteractionNeeded]);

  // Handle path changes
  useEffect(() => {
    if (!audioRef.current) return;

    // If navigating to homepage, pause the music
    if (isHomePage) {
      audioRef.current.pause();
    }
    // If coming from homepage to another page, and music was playing before, resume it
    else if (
      prevPathRef.current === "/" &&
      pathname !== "/" &&
      localStorage.getItem("musicPlaying") !== "false"
    ) {
      if (window.userHasInteracted) {
        audioRef.current.play().catch((error) => {
          console.warn("Play prevented, need user interaction:", error);
          setUserInteractionNeeded(true);
        });
      } else {
        setUserInteractionNeeded(true);
      }
    }

    // Update the previous path
    prevPathRef.current = pathname;
  }, [pathname, isHomePage]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.warn("Play prevented, need user interaction:", error);
        setUserInteractionNeeded(true);
      });
    }

    // Mark that user has interacted with the page
    window.userHasInteracted = true;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    // Force update to reflect mute state change
    setIsPlaying((prev) => prev); // This triggers a re-render without changing state
  };

  // Don't render anything on the homepage or if audio isn't available
  if (!isVisible || isHomePage) return null;

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
          className={`music-toggle-btn ${
            userInteractionNeeded ? "pulse-animation" : ""
          }`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={
            userInteractionNeeded
              ? "Click to enable audio"
              : isPlaying
              ? "Pause"
              : "Play"
          }
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>

        {showControls && (
          <div className="music-controls-floating">
            <button
              className="mute-btn-floating"
              onClick={toggleMute}
              aria-label={audioRef.current?.muted ? "Unmute" : "Mute"}
            >
              {audioRef.current?.muted ? (
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

export default PersistentAudio;
