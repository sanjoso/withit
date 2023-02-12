import artworkPlaceholder from "../img/artworkplaceholder.png";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk(
	"artist/fetchArtist",
	async (artistId) => {
		const token = window.localStorage.getItem("spotifyToken");
		const headers = { Authorization: `Bearer ${token}` };
		const artistEndpoint = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single%2Cappears_on&limit=3`;
        const albumEndpoint = 

		try {
			// Initial album fetch (fetches most recent 3)
			const response = await fetch(`${artistEndpoint}`, { headers: headers });
			const jsonResponse = await response.json();
			//Put the album Ids in an array, which we will then query Spotify for the newest/most popular track or two
			let albumIdsArray = [];
			Object.values(jsonResponse.items).forEach((val) => {
				albumIdsArray.push(val.id);
			});


		} catch (error) {
			console.log(error);
		}
	}
);

const slice = {
	name: "artist",
	initialState: {
		artwork: { artworkPlaceholder },
		tracks: [],
		name: "",
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: {
		[fetchArtist.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[fetchArtist.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			//state.artwork = action.payload.images[0];
			//state.tracks = action.payload.tracks.items;
			//state.name = action.payload.name;
		},
		[fetchArtist.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const artistSlice = createSlice(slice);

export const selectArtistArtwork = (state) => state.playlist.artwork;
export const selectArtistTracks = (state) => state.playlist.tracks;
export const selectArtistName = (state) => state.playlist.name;
export default artistSlice.reducer;
