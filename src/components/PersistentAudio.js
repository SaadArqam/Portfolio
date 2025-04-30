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
  const [showControls, setShowControls] = useState(false);
  const [userInteractionNeeded, setUserInteractionNeeded] = useState(false);

  const audioRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const markUserInteraction = () => {
      window.userHasInteracted = true;
      if (audioRef.current && userInteractionNeeded && !isHomePage) {
        audioRef.current
          .play()
          .then(() => {
            setUserInteractionNeeded(false);
            setIsPlaying(true);
            localStorage.setItem("musicPlaying", "true");
          })
          .catch((e) => console.error("Audio playback error:", e));
      }

      document.removeEventListener("click", markUserInteraction);
      document.removeEventListener("touchstart", markUserInteraction);
      document.removeEventListener("keydown", markUserInteraction);
    };

    document.addEventListener("click", markUserInteraction);
    document.addEventListener("touchstart", markUserInteraction);
    document.addEventListener("keydown", markUserInteraction);

    if (!window.persistentAudio) {
      const audio = new Audio("/music/background-music.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      window.persistentAudio = audio;
      audioRef.current = audio;

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
        if (
          !isHomePage &&
          localStorage.getItem("musicPlaying") !== "false" &&
          window.userHasInteracted
        ) {
          audio.play().catch(() => setUserInteractionNeeded(true));
        }
      });

      audio.addEventListener("error", () => setIsVisible(false));
    } else {
      audioRef.current = window.persistentAudio;
      setIsPlaying(!window.persistentAudio.paused);
      setIsVisible(true);
    }

    return () => {
      document.removeEventListener("click", markUserInteraction);
      document.removeEventListener("touchstart", markUserInteraction);
      document.removeEventListener("keydown", markUserInteraction);
    };
  }, [isHomePage, userInteractionNeeded]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isHomePage) {
      audioRef.current.pause();
    } else if (
      prevPathRef.current === "/" &&
      pathname !== "/" &&
      localStorage.getItem("musicPlaying") !== "false"
    ) {
      if (window.userHasInteracted) {
        audioRef.current.play().catch(() => setUserInteractionNeeded(true));
      } else {
        setUserInteractionNeeded(true);
      }
    }

    prevPathRef.current = pathname;
  }, [pathname, isHomePage]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setUserInteractionNeeded(true));
    }
    window.userHasInteracted = true;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsPlaying((prev) => prev);
  };

  if (!isVisible || isHomePage) return null;

  const styles = {
    container: {
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      zIndex: 50,
    },
    player: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: showControls ? "1.5rem" : "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: showControls ? "column" : "row",
      width: showControls ? "220px" : "48px",
      height: showControls ? "auto" : "48px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(5px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      padding: showControls ? "12px" : "0",
    },
    button: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s ease",
      animation: userInteractionNeeded ? "pulse 2s infinite" : "none",
    },
    controls: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "8px",
      marginTop: "10px",
    },
    muteButton: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "4px",
      marginTop: "4px",
      borderRadius: "4px",
      transition: "background-color 0.2s ease",
      alignSelf: "flex-end",
    },
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div style={styles.player}>
        <button
          style={styles.button}
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
          <div style={styles.controls}>
            <button
              style={styles.muteButton}
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
