import React, { useRef, useState, useEffect } from "react";
import { SidePlaylist } from "./SidePlaylist";
import { useVideoContext } from "../VideoContextProvider";

const getDuration = (duration) => {
  const splitTime = duration.split(":");
  const parsedTime = parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
  return parsedTime;
};

const VideoPlayer = ({ autoplay }) => {
  const { currentVideo } = useVideoContext();
  const { videoUrl, duration, id } = currentVideo;
  const videoRef = useRef(null);
  const speedRef = useRef(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [displayTime, setDisplayTime] = useState("0:00");
  const [speed, setSpeed] = useState(1);
  const [totalTime] = useState(() => getDuration(duration));

  useEffect(() => {
    const video = videoRef.current;
    video.playbackRate = speed;
    video.addEventListener("timeupdate", () => {
      setCurrentTime(video.currentTime);
      const currentTime = video.currentTime;
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.round(currentTime % 60);
      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setDisplayTime(formattedTime);
    });
    if (autoplay) {
      video.play();
    }
    return () => {
      video.removeEventListener("timeupdate", () => {});
    };
  }, [autoplay, id]);

  const handleSpeedChange = (e) => {
    const video = videoRef.current;
    video.playbackRate = parseFloat(e.target.value);
    setSpeed(e.target.value);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="lg:flex">
      <div className="videoVideoPlayer lg:w-8/12">
        <video
          className="rounded-2xl"
          ref={videoRef}
          src={videoUrl}
          //   autoPlay
          width="100%"
          height="100%"
          controls
          muted
        />
        <div className="flex text-xs justify-between items-center mt-2 px-2">
          <button
            className="w-1/12 bg-slate-300 rounded-md"
            onClick={handlePlayPause}
          >
            Play/Pause
          </button>
          <div className="w-6/12 flex justify-between">
            <p>{displayTime}</p>
            <input
              type="range"
              min={0}
              max={totalTime}
              value={currentTime}
              onChange={handleSeek}
              className="w-11/12 mx-2 cursor-pointer"
            />
            <p>{duration}</p>
          </div>
          <div>
            <label htmlFor="speed">Playback speed: </label>
            <select
              name="speed"
              id="speed"
              ref={speedRef}
              value={speed}
              onChange={handleSpeedChange}
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>
        </div>
      </div>
      <SidePlaylist />
    </div>
  );
};

export default VideoPlayer;
