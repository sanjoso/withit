import { configureStore } from "@reduxjs/toolkit";

import playlistReducer from "./components/Spotify/redux/playlistSlice";
import artistReducer from "./components/Spotify/redux/artistSlice";
import searchReducer from "./components/Spotify/redux/searchSlice";

const store = configureStore({
	reducer: {
		playlist: playlistReducer,
		artist: artistReducer,
		search: searchReducer,
	},
});

export default store;
