"use client";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "./MusicContext";

export default function MusicPlayer() {
  const {
    isPlaying,
    isMuted,
    duration,
    currentTime,
    togglePlay,
    toggleMute,
    seek,
    calculateProgress,
  } = useMusic();

  const [isRotating, setIsRotating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const progressRef = useRef(null);

  // Update rotation state when play state changes
  if (isPlaying && !isRotating) {
    setIsRotating(true);
    if (!hasInteracted) setHasInteracted(true);
  } else if (!isPlaying && isRotating) {
    setIsRotating(false);
  }

  const getFormattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    <div className="music-player-container">
      {/* {!hasInteracted && (
        <div className="interaction-message">Click play to listen</div>
      )} */}

      <div className={`vinyl-record ${isRotating ? "rotating" : ""}`}>
        <div className="vinyl-label">
          <div className="vinyl-hole"></div>
        </div>
      </div>

      <div className="music-controls">
        <div className="time-display">
          <span>{getFormattedTime(currentTime)}</span>
          <span>/</span>
          <span>{!isNaN(duration) ? getFormattedTime(duration) : "0:00"}</span>
        </div>

        <div
          className="progress-bar"
          ref={progressRef}
          onClick={handleProgressChange}
        >
          <div
            className="progress-filled"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>

        <div className="controls">
          <button onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          <button onClick={toggleMute} className="mute-btn">
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
