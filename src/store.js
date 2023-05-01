import { configureStore } from "@reduxjs/toolkit";

//Spotify Reducers
import BVSpotifyPlaylistReducer from "./components/Spotify/redux/BVSpotifyPlaylistSlice";
import BVSpotifyArtistReducer from "./components/Spotify/redux/BVSpotifyArtistSlice";
import BVSpotifySearchReducer from "./components/Spotify/redux/BVSpotifySearchSlice";
import BVSpotifyChoiceReducer from "./components/Spotify/redux/BVSpotifyChoiceSlice";

//YT Reducers
import BVYouTubeChannelSearchReducer from "./components/YouTube/redux/BVYouTubeChannelSearchSlice";
import BVYouTubeChoiceReducer from "./components/YouTube/redux/BVYouTubeChoiceSlice";

const store = configureStore({
	reducer: {
		BVSpotifyPlaylist: BVSpotifyPlaylistReducer,
		BVSpotifyArtist: BVSpotifyArtistReducer,
		BVSpotifySearch: BVSpotifySearchReducer,
		BVSpotifyChoice: BVSpotifyChoiceReducer,

		BVYouTubeChannelSearch: BVYouTubeChannelSearchReducer,
		BVYouTubeChoice: BVYouTubeChoiceReducer,
	},
});

export default store;
