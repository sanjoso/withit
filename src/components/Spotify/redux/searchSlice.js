import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
	"search/fetchSearchResults",
	async (searchQuery) => {
		const token = window.localStorage.getItem("spotifyToken");
		const headers = { Authorization: `Bearer ${token}` };
		const type = "artist%2Cplaylist";
		const endpoint = ` 	https://api.spotify.com/v1/search?q=${searchQuery}&type=${type}&market=ES&limit=10&offset=0`;

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
		[fetchSearchResults.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchSearchResults.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.artists = action.payload.artists.items;
			state.playlists = action.payload.playlists.items;
		},
		[fetchSearchResults.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const searchSlice = createSlice(slice);

export const selectArtistResults = (state) => state.search.artists;
export const selectPlaylistResults = (state) => state.search.playlists;
export default searchSlice.reducer;
