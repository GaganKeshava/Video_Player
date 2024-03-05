import React, { createContext, useContext, useReducer } from 'react';
import dummyData from './utils/videos.json';

const VideoContext = createContext();

const initialState = {
    playlist: dummyData.videos,
    currentVideo: {}
}

export const reducer = (state, action) => {
    switch(action.type) {
        case "RE_ORDER":
            return {
                ...state,
                playlist: action.payload
            }
        
        case "CURRENT_VIDEO":
            return {
                ...state,
                currentVideo: action.payload
            }
        default:
            return state;
    }
}

export const VideoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <VideoContext.Provider value={{ ...state, dispatch }}>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => useContext(VideoContext);