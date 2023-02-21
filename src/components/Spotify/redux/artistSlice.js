import artworkPlaceholder from "../img/artworkplaceholder.png";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk(
	"artist/fetchArtist",
	async (uri) => {
		const token = window.localStorage.getItem("spotifyToken");
		const artistId = uri.replace("spotify:artist:", "");
		const headers = { Authorization: `Bearer ${token}` };
		const artistEndpoint = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single%2Cappears_on&limit=3`;

		try {
			let albumsArray = [];
			let tracksArray = [];
			// Initial album fetch (fetches most recent 3)
			const albumResponse = await fetch(`${artistEndpoint}`, {
				headers: headers,
			});
			const jsonAlbumResponse = await albumResponse.json();
			//Put the album Ids in an array, which we will then query Spotify for the newest/most popular track or two
			Object.values(jsonAlbumResponse.items).forEach((val) => {
				albumsArray.push({
					name: val.name,
					id: val.id,
					releaseDate: val.release_date,
					artwork: val.images[0].url,
					artist: val.artists[0].name,
				});
			});
			// Now, search Spotify for album tracks

			albumsArray.map(async function (album) {
				const tracksResponse = await fetch(
					`https://api.spotify.com/v1/albums/${album.id}/tracks`,
					{ headers: headers }
				);
				const jsonTracksResponse = await tracksResponse.json();
				Object.values(jsonTracksResponse.items).forEach((val) => {
					tracksArray.push({
						name: val.name,
						uri: val.uri,
						releaseDate: album.releaseDate,
						artwork: album.artwork,
						artist: album.artist,
					});
				});
			});
			return tracksArray;
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
			console.log(action.payload);
			state.tracks = [...action.payload];
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
