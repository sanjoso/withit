import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllSpotify = createAsyncThunk(
	"allSpotify/fetchAllSpotify",
	async () => {
		const token = window.localStorage.getItem("spotifyToken");
		const headers = { Authorization: `Bearer ${token}` };
		//const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=15`;
		//const tracksEndpoint = `https://api.spotify.com/v1/tracks?ids=${trackIds}`;
	}
);

const slice = {
	name: "allSpotify",
	initialState: {
		tracks: [],
		name: "",
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchAllSpotify.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchAllSpotify.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			//state.artwork = action.payload.images[0];
			//state.tracks = action.payload.tracks.items;
			//state.name = action.payload.name;
		},
		[fetchAllSpotify.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const allSpotifySlice = createSlice(slice);

// export const selectArtwork = (state) => state.playlist.artwork;
// export const selectTracks = (state) => state.playlist.tracks;
// export const selectName = (state) => state.playlist.name;
export default allSpotifySlice.reducer;
