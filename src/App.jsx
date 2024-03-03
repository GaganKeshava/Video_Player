import React, { useState } from "react";
import dummyData from "./assets/videos.json";
import { HomePlaylist } from "./scripts/HomePlaylist";

const App = () => {
  const videoList = dummyData.videos;
  const [currentVideo, setCurrentVideo] = useState();

  const handleVideoClick = (id) => {
    console.log(id);
    setCurrentVideo(id);
  };

  return (
    <div className="w-fit sm:p-5 md:p-10">
      <h1 className="text-3xl text-center font-bold underline">Video Player</h1>
      <HomePlaylist videoList={videoList} onVideoClick={handleVideoClick} />
    </div>
  );
};

export default App;
