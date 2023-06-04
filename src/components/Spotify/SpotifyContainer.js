import { SpotifyMain } from "./SpotifyMain";
import { SpotifyPopup } from "./SpotifyPopup";
import { getSpotifyToken } from "./SpotifyUtils";

import menuicon from "../BandView/img/menuicon.svg";
import { useEffect, useState } from "react";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const [popup, setPopup] = useState(false);

	useEffect(() => {
		const handlePopupEscape = (event) => {
			if (event.keyCode === 27) {
				setPopup(false);
			}
		};
		window.addEventListener("keydown", handlePopupEscape);

		return () => {
			window.removeEventListener("keydown", handlePopupEscape);
		};
	}, []);

	function togglePopup(event) {
		popup ? setPopup(false) : setPopup(true);
	}

	function handleClickOutsidePopup(click) {
		setPopup(false);
	}

	return (
		<div id="spotifycontainer">
			{popup ? (
				<SpotifyPopup
					service="BVSpotify"
					handleClickOutsidePopup={handleClickOutsidePopup}
				/>
			) : (
				""
			)}
			<div id="spotifycontainer__titlebar">
				<h3>Spotify</h3>
				<img src={menuicon} alt="" onClick={togglePopup} />
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
