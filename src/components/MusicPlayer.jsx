"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Set events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Clean up events
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      try {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsRotating(true);
              setHasInteracted(true);
            })
            .catch((error) => {
              console.error("Playback prevented:", error);
              setIsPlaying(false);
              setIsRotating(false);
            });
        }
      } catch (error) {
        console.error("Error during play:", error);
        setIsPlaying(false);
        setIsRotating(false);
      }
    } else {
      try {
        audioRef.current.pause();
        setIsRotating(false);
      } catch (error) {
        console.error("Error during pause:", error);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getFormattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculateProgress = () => {
    if (!duration) return "0%";
    return `${(currentTime / duration) * 100}%`;
  };

  const handleProgressChange = (e) => {
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressBarWidth = progressRect.width;
    const percentage = clickPosition / progressBarWidth;

    if (audioRef.current) {
      audioRef.current.currentTime = percentage * duration;
    }
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
            style={{ width: calculateProgress() }}
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

      <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
    </div>
  );
}
