// Redux imports
import {
	fetchPlaylist,
	selectPlaylistArtwork,
	selectPlaylistTracks,
	selectPlaylistName,
} from "./redux/playlistSlice";
import {
	fetchArtist,
	selectArtistArtwork,
	selectArtistTracks,
	selectArtistName,
} from "./redux/artistSlice";
import { selectChoice } from "./redux/choiceSlice";

// Hook imports
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Component imports
import { SpotifyTrack } from "./SpotifyTrack";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const choice = useSelector(selectChoice);
	const playlistArtwork = useSelector(selectPlaylistArtwork);
	const playlistTracks = useSelector(selectPlaylistTracks);
	const playlistName = useSelector(selectPlaylistName);
	const artistArtwork = useSelector(selectArtistArtwork);
	const artistTracks = useSelector(selectArtistTracks);
	const artistName = useSelector(selectArtistName);

	useEffect(() => {
		if (choice[1] === "playlist") {
			dispatch(fetchPlaylist(choice[0]));
		} else {
			dispatch(fetchArtist(choice[0]));
		}
	}, [choice]);

	return (
		<div id="spotifymain">
			<div id="spotifymain__artwork">
				<img
					src={
						choice[1] === "playlist" ? playlistArtwork.url : artistArtwork.url
					}
					alt=""
				/>
				{choice[1] === "playlist" ? playlistName : artistName}
			</div>

			<div id="spotifymain__tracks">
				{choice[1] === "playlist"
					? playlistTracks.map((track, index) => {
							return <SpotifyTrack track={track} key={index} number={index} />;
					  })
					: artistTracks.map((track, index) => {
							return <SpotifyTrack track={track} key={index} number={index} />;
					  })}
			</div>
		</div>
	);
};
