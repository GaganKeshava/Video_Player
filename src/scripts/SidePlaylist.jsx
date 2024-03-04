import React from "react";
import { useVideoContext } from "../VideoContextProvider";
import { handleDragOver, handleDragStart, handleDrop } from "../utils/Helper";

export const SidePlaylist = () => {
  const { playlist, dispatch } = useVideoContext();
  
  const reorder = (e, idx) => {
    const newPlaylist = handleDrop(e, idx, playlist);
    dispatch({ type: "RE_ORDER", payload: newPlaylist });
  }

  const handleClick = (e) => {
    dispatch({ type: "CURRENT_VIDEO", payload: e });
  };

  return (
    <div className="grid sm:grid-rows-1 lg:w-4/12 gap-4 lg:pl-10 sm:mt-3 md:mt-5 lg:mt-0">
      {playlist.map((item, idx) => {
        return (
          <div
            key={idx}
            className="cursor-pointer flex"
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={(e) => reorder(e, idx)}
            onClick={() => handleClick(item)}
          >
            <div className="relative w-6/12">
              <img
                className="rounded-lg object-fit"
                src={item.thumbnailUrl}
                alt={item.title}
              />
              <p className="text-xs absolute bottom-0 right-2 text-white">
                {item.duration}
              </p>
            </div>
            <div className="pl-2 pt-1 w-8/12">
              <p className="text-sm 2xl:text-lg font-bold line-clamp-2">
                {item.description}
              </p>
              <p className="text-xs 2xl:text-base mt-2">{item.author}</p>
              <p className="text-xs 2xl:text-base mt-1">{item.views} views</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
