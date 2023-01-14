import { configureStore } from "@reduxjs/toolkit";

import playlistReducer from "./components/Spotify/playlistSlice";

const store = configureStore({
	reducer: {
		playlist: playlistReducer,
	},
});

export default store;
