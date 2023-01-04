import { fetchPlaylistTracks, selectTracks } from "./tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SpotifyTrack } from "./SpotifyTrack";

export const SpotifyMain = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPlaylistTracks());
	}, [dispatch]);

	const tracks = useSelector(selectTracks);

	return (
		<div className="spotifymain">
			{tracks.map((track) => {
				return <SpotifyTrack track={track} key={track.id} />;
			})}
		</div>
	);
};
