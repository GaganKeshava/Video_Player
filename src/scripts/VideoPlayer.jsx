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
  const { videoUrl, duration, id, ...rest } = currentVideo;
  const videoRef = useRef(null);
  const speedRef = useRef(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
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

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
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
          autoPlay
          width="100%"
          height="100%"
          controls
        />
        <div className="flex text-xs justify-between items-center mt-2 px-2">
          <button
            className=" bg-slate-300 rounded-md"
            onClick={handlePlayPause}
          >
            Play/Pause
          </button>
          <div className=" flex justify-between">
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
          <div className="flex">
            <label htmlFor="volume">Volume: </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-6/12 ml-1 cursor-pointer"
            />
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
        <div className="pl-2 mt-4">
          <p className="text-sm 2xl:text-lg font-bold">{rest.description}</p>
          <p className="text-xs 2xl:text-base mt-2">{rest.author}</p>
          <p className="text-xs 2xl:text-base mt-1">{rest.views} views</p>
        </div>
      </div>
      <SidePlaylist />
    </div>
  );
};

export default VideoPlayer;
