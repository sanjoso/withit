import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBVYouTubeChannels = createAsyncThunk(
	"ytsearch/fetchBVYouTubeChannels",
	async (searchQuery) => {
		const apiKey = "AIzaSyDhHfCHwLagwTnom1_Vc1pMQIJAoaZO35Y";
		const endpoint = "https://www.googleapis.com/youtube/v3/search";
		const searchTerm = "Elevation Worship";
		try {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?q=' + ${searchTerm} + '&part=snippet&type=channel&key=${apiKey}`
			);
			const jsonResponse = await response.json();
			return jsonResponse;
		} catch (error) {
			console.log(error);
		}
	}
);

const slice = {
	name: "ytChannel",
	initialState: {
		results: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchBVYouTubeChannels.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchBVYouTubeChannels.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.results = action.payload.items;
		},
		[fetchBVYouTubeChannels.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const BVYouTubeChannelSearchSlice = createSlice(slice);
export const selectBVYouTubeChannels = (state) =>
	state.BVYouTubeChannelSearch.results;
export default BVYouTubeChannelSearchSlice.reducer;
