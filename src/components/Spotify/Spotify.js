import { getPlaylistItems, getSpotifyToken } from "../../util/SpotifyUtils";

const token = window.localStorage.getItem("spotifyToken");
console.log(token);

export const Spotify = () => {
	return (
		<div className="spotifycontainer">
			<button onClick={getSpotifyToken}>Get Spotify Token</button>
			{token ? getPlaylistItems() : <p>no token</p>}
		</div>
	);
};
