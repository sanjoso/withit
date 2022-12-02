import { useEffect, useState } from "react";
import { SpotifyMain } from "./SpotifyMain";

const CLIENT_ID = "2d09b6bfda8f4f56879497f5f7358b0f";
const REDIRECT_URI = "http://joe-kde:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

export const SpotifyContainer = () => {
	const [spotifyToken, setSpotifyToken] = useState("");

	useEffect(() => {
		const hash = window.location.hash;
		let spotifyToken = window.localStorage.getItem("spotifyToken");

		if (!spotifyToken && hash) {
			spotifyToken = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("spotifyToken", spotifyToken);
		}

		setSpotifyToken(spotifyToken);
	}, []);

	return (
		<div className="spotifycontainer">
			{!spotifyToken ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
			) : (
				<SpotifyMain />
			)}
		</div>
	);
};
