import { fetchPlaylistTracks, selectTracks } from "./tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SpotifyArtwork } from "./SpotifyArtwork";
import { SpotifyTracks } from "./SpotifyTracks";

import trashCan from "./img/delete.png";

export const SpotifyMain = (props) => {
	const dispatch = useDispatch();
	const popupState = props.popup;
	const [searchQuery, setSearchQuery] = useState("Search (network)");

	useEffect(() => {
		// dispatch(fetchPlaylistTracks());
		// const popup = document.getElementById("spotifymain__popup");
		// if (popupState) {
		// 	popup.style.display = "block";
		// } else {
		// 	popup.style.display = "none";
		// }
	}, [dispatch, popupState]);

	function handleChange(event) {
		setSearchQuery(event.target.value);
	}

	function handleSubmit(event) {
		searchQuery(event.target.value);
		//dispatch the search thunk here
	}

	return (
		<div id="spotifymain">
			{/* <div id="spotifymain__popup">
				<div id="spotifymain__popup__searchbar">
					<div id="spotifymain__popup__searchbar__search">
						<form onSubmit={handleSubmit}>
							<input type="text" value={searchQuery} onChange={handleChange} />
						</form>
					</div>
					<div id="spotifymain__popup__subscriptionscontainer">
						<p>New Worship Weekly</p>
						<img src={trashCan} alt="" />
					</div>
				</div>
			</div> */}
			<SpotifyArtwork />
			<SpotifyTracks />
			{/* {tracks.map((track) => {
				return <SpotifyTrack track={track} key={track.id} />;
			})} */}
		</div>
	);
};
