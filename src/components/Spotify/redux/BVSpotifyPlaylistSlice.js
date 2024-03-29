import artworkPlaceholder from "../img/artworkplaceholder.png";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlaylist = createAsyncThunk(
	"playlist/fetchPlaylist",
	async (uri) => {
		const token = window.localStorage.getItem("spotifyToken");
		const playlistId = uri.replace("spotify:playlist:", "");
		const headers = { Authorization: `Bearer ${token}` };
		const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;

		try {
			const response = await fetch(`${endpoint}`, { headers: headers });
			const jsonResponse = await response.json();
			return jsonResponse;
		} catch (error) {
			console.log(error);
		}
	}
);

const slice = {
	name: "playlist",
	initialState: {
		artwork: { artworkPlaceholder },
		tracks: [],
		name: "",
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchPlaylist.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchPlaylist.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.artwork = action.payload.images[0];
			state.tracks = action.payload.tracks.items;
			state.name = action.payload.name;
		},
		[fetchPlaylist.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const playlistSlice = createSlice(slice);

export const selectPlaylistArtwork = (state) => state.BVSpotifyPlaylist.artwork;
export const selectPlaylistTracks = (state) => state.BVSpotifyPlaylist.tracks;
export const selectPlaylistName = (state) => state.BVSpotifyPlaylist.name;
export default playlistSlice.reducer;
