import {
	fetchPlaylist,
	selectPlaylistArtwork,
	selectPlaylistTracks,
	selectPlaylistName,
} from "./redux/playlistSlice";

import { SpotifyTrack } from "./SpotifyTrack";

import { useDispatch, useSelector } from "react-redux";

export const SpotifyMainNew = (props) => {
	const dispatch = useDispatch();
	const artwork = useSelector(selectPlaylistArtwork);
	const tracks = useSelector(selectPlaylistTracks);
	const name = useSelector(selectPlaylistName);

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
