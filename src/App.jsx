import React from "react";
import { HomePlaylist } from "./scripts/HomePlaylist";
import VideoPlayer from "./scripts/VideoPlayer";
import { useVideoContext } from "./VideoContextProvider";

const App = () => {
  const { currentVideo } = useVideoContext();
  return (
    <div className="w-fit sm:p-5 md:p-10">
      <h1 className="text-3xl text-center font-bold underline">Video Player</h1>
      {Object.keys(currentVideo).length > 0 ? (
        <VideoPlayer autoplay />
      ) : (
        <HomePlaylist />
      )}
    </div>
  );
};

export default App;
