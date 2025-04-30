"use client";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { useMusic } from "./MusicContext";

export default function MiniMusicPlayer() {
  const {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    calculateProgress,
    duration,
    currentTime,
    seek,
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const progressRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProgressChange = (e) => {
    if (!progressRef.current) return;

    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressBarWidth = progressRect.width;
    const percentage = clickPosition / progressBarWidth;

    seek(percentage * duration);
  };

  return (
    <div className={`mini-player ${isExpanded ? "mini-player-expanded" : ""}`}>
      {isExpanded ? (
        <div className="mini-player-content">
          <div
            className="mini-player-progress"
            ref={progressRef}
            onClick={handleProgressChange}
          >
            <div
              className="mini-player-progress-filled"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          <div className="mini-player-controls">
            <button
              onClick={togglePlay}
              className="mini-player-btn mini-player-play-btn"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="mini-player-btn"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </button>

            <button
              onClick={toggleExpand}
              className="mini-player-btn"
              aria-label="Collapse player"
            >
              <Music className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleExpand}
          className="mini-player-toggle"
          aria-label="Expand music player"
        >
          <Music
            className={`h-4 w-4 ${isPlaying ? "text-black" : "text-gray-500"}`}
          />
        </button>
      )}
    </div>
  );
}
