import React from "react";
import { useVideoContext } from "../VideoContextProvider";
import { handleDragOver, handleDragStart, handleDrop } from "../utils/Helper";

export const HomePlaylist = () => {
  const { playlist, dispatch } = useVideoContext();

  const reorder = (e, idx) => {
    const newPlaylist = handleDrop(e, idx, playlist);
    dispatch({ type: "RE_ORDER", payload: newPlaylist });
  }

  const handleClick = (e) => {
    dispatch({ type: "CURRENT_VIDEO", payload: e });
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlist.map((item, idx) => {
        return (
          <div
            key={idx}
            className="cursor-pointer sm:flex md:block"
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={(e) => reorder(e, idx)}
            onClick={() => handleClick(item)}
          >
            <div className="relative sm:w-6/12 md:w-full">
                <img className="rounded-lg" src={item.thumbnailUrl} alt={item.title} />
                <p className="text-xs xl:text-sm sm:bottom-1 md:bottom-0.5 xl:bottom-1.5 absolute right-2 text-white">
                {item.duration}
                </p>
            </div>
            <div className="px-2 sm:w-6/12 md:w-full">
                <p className="text-lg font-bold line-clamp-2">{item.description}</p>
                <p>{item.author}</p>
                <p>{item.views} views</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
