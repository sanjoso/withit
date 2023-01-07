//import { getSpotifyToken } from "./SpotifyUtils";
import { SpotifyMain } from "./SpotifyMain";
import { getSpotifyToken } from "./SpotifyUtils";
import ellipses from "./img/ellipses.png";
import { useState } from "react";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const [popup, setPopup] = useState(false);

	function handlePopupClick(event) {
		if (popup) {
			setPopup(false);
		} else {
			setPopup(true);
		}
	}

	return (
		<div className="spotifycontainer">
			<div className="spotifycontainer__titlebar">
				<h3>SPOTIFY</h3>
				<img src={ellipses} alt="" onClick={handlePopupClick} />
			</div>
			{!token ? (
				<button onClick={getSpotifyToken}>Get Spotify Token</button>
			) : (
				<SpotifyMain popup={popup} />
			)}
		</div>
	);
};
