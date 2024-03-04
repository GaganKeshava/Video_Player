export const handleDragStart = (e, index) => {
  e.dataTransfer.setData("index", index);
};

export const handleDragOver = (e) => {
  e.preventDefault();
};

export const handleDrop = (e, index, playlist) => {
  const dragIndex = parseInt(e.dataTransfer.getData("index"));
  const newPlaylist = [...playlist];
  const [draggedItem] = newPlaylist.splice(dragIndex, 1);
  newPlaylist.splice(index, 0, draggedItem);
  return newPlaylist;
};
