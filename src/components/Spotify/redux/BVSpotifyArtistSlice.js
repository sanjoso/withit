import artworkPlaceholder from "../img/artworkplaceholder.png";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk(
	"artist/fetchArtist",
	async (uri) => {
		const token = window.localStorage.getItem("spotifyToken");
		const artistId = uri.replace("spotify:artist:", "");
		const headers = { Authorization: `Bearer ${token}` };
		const albumEndpoint = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single%2Cappears_on&limit=5`;
		const artistEndpoint = `https://api.spotify.com/v1/artists/${artistId}`;

		try {
			let albumsArray = [];
			let tracksArray = [];

			// Get the artist image, to display it on SpotifyMain
			const artistResponse = await fetch(`${artistEndpoint}`, {
				headers: headers,
			});
			const jsonArtistResponse = await artistResponse.json();
			const artistImage = { artistImage: jsonArtistResponse.images[0].url };
			// Initial album fetch (fetches most recent 3)
			const albumResponse = await fetch(`${albumEndpoint}`, {
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
			await Promise.all(
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
				})
			);
			tracksArray.push(artistImage);
			return tracksArray;
		} catch (error) {
			console.log(error);
		}
	}
);

const slice = {
	name: "artist",
	initialState: {
		artwork: artworkPlaceholder,
		artistImage: "",
		results: [],
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
			state.results = action.payload.slice(0, -1);
			state.artwork = action.payload[0].artwork;
			state.artistImage = action.payload.at(-1).artistImage;
			state.name = action.payload[0].artist;
		},
		[fetchArtist.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
};

const artistSlice = createSlice(slice);

export const selectArtistResults = (state) => state.BVSpotifyArtist.results;
export const selectArtistArtwork = (state) => state.BVSpotifyArtist.artistImage;
export const selectArtistName = (state) => state.BVSpotifyArtist.name;
export default artistSlice.reducer;
