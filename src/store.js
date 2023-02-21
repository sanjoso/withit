import { configureStore } from "@reduxjs/toolkit";

import playlistReducer from "./components/Spotify/redux/playlistSlice";
import artistReducer from "./components/Spotify/redux/artistSlice";
import searchReducer from "./components/Spotify/redux/searchSlice";
import choiceReducer from "./components/Spotify/redux/choiceSlice";

const store = configureStore({
	reducer: {
		playlist: playlistReducer,
		artist: artistReducer,
		search: searchReducer,
		choice: choiceReducer,
	},
});

export default store;
