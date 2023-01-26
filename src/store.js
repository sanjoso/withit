import { configureStore } from "@reduxjs/toolkit";

import playlistReducer from "./components/Spotify/playlistSlice";
import searchReducer from "./components/Spotify/searchSlice";

const store = configureStore({
	reducer: {
		playlist: playlistReducer,
		search: searchReducer,
	},
});

export default store;
