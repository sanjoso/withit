//import { getSpotifyToken } from "./SpotifyUtils";
import { SpotifyMain } from "./SpotifyMain";
import { getSpotifyToken } from "./SpotifyUtils";
import dropdowncarat from "../BandView/img/dropdowncarat.png";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");

	return (
		<div id="spotifycontainer">
			<div id="spotifycontainer__titlebar">
				<h3>Spotify</h3>
				<img src={dropdowncarat} alt="" />
			</div>
			{!token ? (
				<button onClick={getSpotifyToken}>Get Spotify Token</button>
			) : (
				<SpotifyMain />
			)}
		</div>
	);
};
