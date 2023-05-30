import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBVYouTubeVideos = createAsyncThunk(
	"ytsearch/fetchBVYouTubeVideos",
	async (channel) => {
		const apiKey = "AIzaSyDhHfCHwLagwTnom1_Vc1pMQIJAoaZO35Y";
		const endpoint = "https://www.googleapis.com/youtube/v3/search?";

		try {
			const response = await fetch(
				`${endpoint}part=snippet&channelId=${channel.channelId}&maxResults=20&order=date&key=${apiKey}`
			);
			const jsonResponse = await response.json();
			console.log(jsonResponse);
			return jsonResponse;
		} catch (error) {
			console.log(error);
		}
	}
);

const slice = {
	name: "ytVideos",
	initialState: {
		results: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchBVYouTubeVideos.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchBVYouTubeVideos.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.results = action.payload.items;
		},
		[fetchBVYouTubeVideos.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const BVYouTubeVideosSlice = createSlice(slice);
export const selectBVYouTubeVideos = (state) => state.BVYouTubeVideos.results;
export default BVYouTubeVideosSlice.reducer;
