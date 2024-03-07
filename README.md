# Video Player

This application allows the user to re-order the available videos in any order and play the selected video. The application has following features
1) Video Player Component
   - Play/Pause Toggle.
   - Seek functionality.
   - Timer displaying current playback time and duration.
   - Autoplay.
   - Speed selector for playback speed adjustment.
   - Volume controller.

2) Playlist Component
   - Allowing users to reorder videos in the playlist.
   - Clicking on a video in the playlist loads and plays that video in the video player.

3) React State Management
   - Used Context API for state management across the application.

4) Styling
   - Used Tailwind CSS for styling the components.
  
# Project Structure

1) Context
   - VideoContextProvider: Dispatch actions and the state management for the application.

2) Scripts
   - HomePlaylist: Contains all the available videos. The user can reorder the videos.
   - SidePlaylist: The available videos in the side bar when current video is playing.
   - VideoPlayer: Displays the current video which is playing.

# To run this application locally, please follow these steps

1) Clone the application.
2) Run npm install to install the dependencies.
3) Run npm run dev to start the application.

The application can be viewed live on [Video_Player](https://videoplayer-rigi.netlify.app/)
