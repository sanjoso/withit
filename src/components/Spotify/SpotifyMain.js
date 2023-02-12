import {
	fetchPlaylist,
	selectPlaylistArtwork,
	selectPlaylistTracks,
	selectPlaylistName,
} from "./redux/playlistSlice";
import { fetchArtist } from "./redux/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SpotifyTrack } from "./SpotifyTrack";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const artwork = useSelector(selectPlaylistArtwork);
	const tracks = useSelector(selectPlaylistTracks);
	const name = useSelector(selectPlaylistName);

	useEffect(() => {
		dispatch(fetchArtist("58r1rB5t3VF5X6yXGPequV"));
	}, [dispatch]);

	return (
		<div id="spotifymain">
			<div id="spotifymain__artwork">
				<img src={artwork.url} alt="" />
				{name}
			</div>

			<div id="spotifymain__tracks">
				{tracks.map((track, index) => {
					return <SpotifyTrack track={track} key={index} number={index} />;
				})}
			</div>
		</div>
	);
};
