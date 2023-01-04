//import { getSpotifyToken } from "./SpotifyUtils";
import { SpotifyMain } from "./SpotifyMain";
import { getSpotifyToken } from "./SpotifyUtils";

export const SpotifyContainer = () => {
	let token = window.localStorage.getItem("spotifyToken");

	return (
		<div className="spotifycontainer">
			{!token ? (
				<button onClick={getSpotifyToken}>Get Spotify Token</button>
			) : (
				<SpotifyMain />
			)}
		</div>
	);
};
