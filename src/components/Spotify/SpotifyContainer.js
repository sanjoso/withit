//import { getSpotifyToken } from "./SpotifyUtils";
import { SpotifyMain } from "./SpotifyMain";
import { getSpotifyToken } from "./SpotifyUtils";
import dropdowncarat from "./img/dropdowncarat.png";
import { useState } from "react";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const [popup, setPopup] = useState(false);

	//this function is ready to go and works. It just needs an onClick={handlePopupClick} trigger
	function handlePopupClick(event) {
		if (popup) {
			setPopup(false);
		} else {
			setPopup(true);
		}
	}

	return (
		<div id="spotifycontainer">
			<div id="spotifycontainer__titlebar">
				<h3>SPOTIFY</h3>
				<img src={dropdowncarat} alt="" onClick={handlePopupClick} />
			</div>
			{!token ? (
				<button onClick={getSpotifyToken}>Get Spotify Token</button>
			) : (
				<SpotifyMain popup={popup} />
			)}
		</div>
	);
};
