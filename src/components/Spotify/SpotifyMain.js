import { fetchPlaylist, selectPlaylist, selectTracks } from "./playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SpotifyTrack } from "./SpotifyTrack";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const playlist = useSelector(selectPlaylist);
	const tracks = useSelector(selectTracks);

	useEffect(() => {
		dispatch(fetchPlaylist());
	}, [dispatch]);

	return (
		<div id="spotifymain">
			{tracks.map((track, index) => {
				return <SpotifyTrack track={track} key={index} number={index} />;
			})}

			<img src={playlist.url} alt="" />
		</div>
	);
};
