import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlaylistTracks = createAsyncThunk(
	"tracks/fetchPlaylistTracks",
	async () => {
		const token = window.localStorage.getItem("spotifyToken");
		const playlistId = "6Hq9wYRY3xs8p5SiIUc1Gw";
		const headers = { Authorization: `Bearer ${token}` };
		const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

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
	name: "tracks",
	initialState: {
		tracks: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchPlaylistTracks.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchPlaylistTracks.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.tracks = action.payload.items;
		},
		[fetchPlaylistTracks.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const tracksSlice = createSlice(slice);

export const selectTracks = (state) => state.tracks.tracks;
export default tracksSlice.reducer;
