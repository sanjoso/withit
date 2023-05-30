// Variable Declarations
const clientId = "2d09b6bfda8f4f56879497f5f7358b0f";
const redirect_uri = "https://joe-suse:3000/callback";
const scopes = [
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-private",
	"playlist-modify-public",
];
const authEndpoint = "https://accounts.spotify.com/authorize";
const responseType = "token";
export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scopes.join(
	"%20"
)}&response_type=${responseType}&show_dialog=false`;

export const getSpotifyToken = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const hash = window.location.hash;
	window.location = loginURL;

	if (!token && hash) {
		// window.location = loginURL;
		token = hash
			.substring(1)
			.split("&")
			.find((elem) => elem.startsWith("access_token"))
			.split("=")[1];

		window.location.hash = "";
		window.localStorage.setItem("spotifyToken", token);
	}
};
