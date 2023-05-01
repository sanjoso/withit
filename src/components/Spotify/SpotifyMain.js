// Redux imports
import {
	fetchPlaylist,
	selectPlaylistArtwork,
	selectPlaylistTracks,
	selectPlaylistName,
} from "./redux/BVSpotifyPlaylistSlice";
import {
	fetchArtist,
	selectArtistResults,
	selectArtistArtwork,
	selectArtistName,
} from "./redux/BVSpotifyArtistSlice";
import { selectBVSpotifyChoice } from "./redux/BVSpotifyChoiceSlice";

// Hook imports
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Component imports
import { PlaylistTrack } from "./PlaylistTrack";
import { ArtistTrack } from "./ArtistTrack";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const choice = useSelector(selectBVSpotifyChoice);
	const playlistArtwork = useSelector(selectPlaylistArtwork);
	const playlistTracks = useSelector(selectPlaylistTracks);
	const playlistName = useSelector(selectPlaylistName);
	const artistResults = useSelector(selectArtistResults);
	const artistArtwork = useSelector(selectArtistArtwork);
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
					src={choice[1] === "playlist" ? playlistArtwork.url : artistArtwork}
					alt=""
				/>
				{choice[1] === "playlist" ? playlistName : artistName}
			</div>

			<div id="spotifymain__tracks">
				{choice[1] === "playlist"
					? playlistTracks.map((track, index) => {
							return <PlaylistTrack track={track} key={index} number={index} />;
					  })
					: artistResults.map((track, index) => {
							return <ArtistTrack track={track} key={index} number={index} />;
					  })}
			</div>
		</div>
	);
};
