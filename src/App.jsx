import React, { useState } from "react";
import dummyData from "./assets/videos.json";
import { HomePlaylist } from "./scripts/HomePlaylist";
import VideoPlayer from "./scripts/VideoPlayer";

const App = () => {
  const videoList = dummyData.videos;
  const [currentVideo, setCurrentVideo] = useState();

  const handleVideoClick = (id) => {
    setCurrentVideo(id);
  };

  return (
    <div className="w-fit sm:p-5 md:p-10">
      <h1 className="text-3xl text-center font-bold underline">Video Player</h1>
      {isNaN(currentVideo) ? (
        <HomePlaylist videoList={videoList} onVideoClick={handleVideoClick} />
      ) : (
        <VideoPlayer videoDetails={videoList[currentVideo]} autoplay />
      )}
    </div>
  );
};

export default App;
