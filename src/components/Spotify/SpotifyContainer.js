import { SpotifyMain } from "./SpotifyMain";
import { SpotifyPopup } from "./SpotifyPopup";
import { getSpotifyToken } from "./SpotifyUtils";

import dropdowncarat from "../BandView/img/dropdowncarat.png";
import { useEffect, useState } from "react";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const [popup, setPopup] = useState(false);

	useEffect(() => {}, []);

	function togglePopup(event) {
		popup ? setPopup(false) : setPopup(true);
	}

	return (
		<div id="spotifycontainer">
			{popup ? <SpotifyPopup /> : ""}
			<div id="spotifycontainer__titlebar">
				<img src={dropdowncarat} alt="" onClick={togglePopup} />
				<h3>Spotify</h3>
			</div>
			{!token ? (
				<div id="spotifycontainer__login">
					<button id="spotifycontainer__loginbtn" onClick={getSpotifyToken}>
						LOG IN TO SPOTIFY
					</button>
				</div>
			) : (
				<SpotifyMain />
			)}
		</div>
	);
};
