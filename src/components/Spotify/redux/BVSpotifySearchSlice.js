import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBVSpotifySearchResults = createAsyncThunk(
	"search/fetchSearchResults",
	async (searchQuery) => {
		const token = window.localStorage.getItem("spotifyToken");
		const headers = { Authorization: `Bearer ${token}` };
		const type = "artist%2Cplaylist";
		const endpoint = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${type}&market=ES&limit=20&offset=0`;

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
	name: "search",
	initialState: {
		artists: [],
		playlists: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchBVSpotifySearchResults.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchBVSpotifySearchResults.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.artists = action.payload.artists.items;
			state.playlists = action.payload.playlists.items;
		},
		[fetchBVSpotifySearchResults.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const BVSpotifySearchSlice = createSlice(slice);

export const selectBVSpotifyArtistResults = (state) =>
	state.BVSpotifySearch.artists;
export const selectBVSpotifyPlaylistResults = (state) =>
	state.BVSpotifySearch.playlists;
export default BVSpotifySearchSlice.reducer;
