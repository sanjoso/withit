import {
	fetchPlaylist,
	selectArtwork,
	selectTracks,
	selectName,
} from "./playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SpotifyTrack } from "./SpotifyTrack";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const artwork = useSelector(selectArtwork);
	const tracks = useSelector(selectTracks);
	const name = useSelector(selectName);

	useEffect(() => {
		dispatch(fetchPlaylist());
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
