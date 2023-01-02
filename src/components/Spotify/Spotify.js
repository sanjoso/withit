import { getSpotifyToken } from "./SpotifyUtils";
import { SpotifyMain } from "./SpotifyMain";

const token = window.localStorage.getItem("spotifyToken");
console.log(token);

export const SpotifyContainer = () => {
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
