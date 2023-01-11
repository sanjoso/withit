import { useSelector, useDispatch } from "react-redux";
import { selectTracks, fetchPlaylistTracks } from "./tracksSlice";
import { SpotifyTrack } from "./SpotifyTrack";
import { useEffect } from "react";

export const SpotifyTracks = () => {
	const dispatch = useDispatch();
	const tracks = useSelector(selectTracks);

	useEffect(() => {
		dispatch(fetchPlaylistTracks());
	}, [dispatch]);

	return (
		<div>
			{tracks.map((track, index) => {
				return <SpotifyTrack track={track} number={index} key={index} />;
			})}
		</div>
	);
};
