"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Keep audio instance outside the component to persist between navigations
let globalAudio = null;

// Create context
const MusicContext = createContext();

// Music provider component
export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(true);

  const audioRef = useRef(null);
  const pathname = usePathname();
  const firstRenderRef = useRef(true);

  // Initialize audio on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if file exists before creating audio element
      const checkMusicExists = async () => {
        try {
          const response = await fetch("/music/background-music.mp3", {
            method: "HEAD",
          });
          if (!response.ok) {
            console.warn(
              "Background music file not found. Please add an MP3 file at /public/music/background-music.mp3"
            );
            setMusicAvailable(false);
            return false;
          }
          return true;
        } catch (error) {
          console.warn("Failed to check background music:", error);
          setMusicAvailable(false);
          return false;
        }
      };

      const initAudio = async () => {
        const exists = await checkMusicExists();
        if (!exists) return;

        // Use the global audio instance if it exists, otherwise create a new one
        if (globalAudio) {
          audioRef.current = globalAudio;

          // Update state to reflect current audio state
          setIsPlaying(!audioRef.current.paused);
          setCurrentTime(audioRef.current.currentTime);
          setVolume(audioRef.current.volume);
          setIsMuted(audioRef.current.muted);

          if (audioRef.current.duration) {
            setDuration(audioRef.current.duration);
          }
        } else {
          // Create new audio element
          globalAudio = new Audio("/music/background-music.mp3");
          globalAudio.loop = true;
          globalAudio.volume = volume;
          audioRef.current = globalAudio;
        }

        // Make sure event listeners are set up
        const updateProgressHandler = () => updateProgress();
        const metadataHandler = () => setDuration(audioRef.current.duration);
        const errorHandler = (e) => {
          console.error("Audio error:", e);
          setMusicAvailable(false);
        };

        // Remove existing listeners to prevent duplicates
        audioRef.current.removeEventListener(
          "timeupdate",
          updateProgressHandler
        );
        audioRef.current.removeEventListener("loadedmetadata", metadataHandler);
        audioRef.current.removeEventListener("error", errorHandler);

        // Add listeners
        audioRef.current.addEventListener("timeupdate", updateProgressHandler);
        audioRef.current.addEventListener("loadedmetadata", metadataHandler);
        audioRef.current.addEventListener("error", errorHandler);
      };

      initAudio();

      // Clean up function only cleans up event listeners, not the audio instance
      return () => {
        if (audioRef.current) {
          const updateProgressHandler = () => updateProgress();
          const metadataHandler = () => setDuration(audioRef.current.duration);
          const errorHandler = (e) => {
            console.error("Audio error:", e);
            setMusicAvailable(false);
          };

          audioRef.current.removeEventListener(
            "timeupdate",
            updateProgressHandler
          );
          audioRef.current.removeEventListener(
            "loadedmetadata",
            metadataHandler
          );
          audioRef.current.removeEventListener("error", errorHandler);
        }
      };
    }
  }, []);

  // Handle pathname changes
  useEffect(() => {
    if (!musicAvailable || !audioRef.current) return;

    // Skip the first render to prevent stopping already playing music
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // Only play on non-home pages
    const isHomePage = pathname === "/";

    if (isHomePage) {
      pauseMusic();
      setShouldPlay(false);
    } else if (shouldPlay) {
      playMusic();
    }
  }, [pathname, shouldPlay, musicAvailable]);

  // Update progress
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Play music
  const playMusic = () => {
    if (audioRef.current && musicAvailable) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShouldPlay(true);
          })
          .catch((err) => {
            console.error("Failed to play music:", err);
            // If autoplay is blocked, we'll consider music unavailable
            if (err.name === "NotAllowedError") {
              // Mark that music is still available but needs user interaction
              console.warn(
                "Music autoplay blocked. Player will be available after user interaction."
              );
            }
          });
      }
    }
  };

  // Pause music
  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  // Set progress
  const setProgress = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Set volume
  const changeVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);

      // If changing volume from 0, unmute
      if (value > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }

      // If setting volume to 0, mute
      if (value === 0 && !isMuted) {
        setIsMuted(true);
      }
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Context value
  const value = {
    isPlaying,
    volume,
    currentTime,
    duration,
    isMuted,
    shouldPlay,
    musicAvailable,
    setShouldPlay,
    togglePlay,
    setProgress,
    toggleMute,
    changeVolume,
    formatTime,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

// Custom hook to use music context
export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
