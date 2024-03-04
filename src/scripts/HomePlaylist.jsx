import React, {useState} from "react";

export const HomePlaylist = ({ videoList, onVideoClick }) => {
  const [playlist, setPlaylist] = useState(videoList);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const dragIndex = parseInt(e.dataTransfer.getData("index"));
    const newPlaylist = [...playlist];
    const [draggedItem] = newPlaylist.splice(dragIndex, 1);
    newPlaylist.splice(index, 0, draggedItem);
    setPlaylist(newPlaylist);
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
            onDrop={(e) => handleDrop(e, idx)}
            onClick={() => onVideoClick(item.id)}
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
