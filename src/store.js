import { configureStore } from "@reduxjs/toolkit";

import tracksReducer from "./components/Spotify/tracksSlice";

const store = configureStore({
	reducer: {
		tracks: tracksReducer,
	},
});

export default store;
