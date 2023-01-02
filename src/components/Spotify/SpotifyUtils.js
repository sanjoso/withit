// Variable Declarations
const clientId = "2d09b6bfda8f4f56879497f5f7358b0f";
const redirect_uri = "http://joe-suse:3000/";
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
)}&response_type=${responseType}&show_dialog=true`;

export const getSpotifyToken = async () => {
	let token = window.localStorage.getItem("spotifyToken");
	const hash = window.location.hash;

	if (!token) {
		window.location = loginURL;
		token = hash
			.substring(1)
			.split("&")
			.find((elem) => elem.startsWith("access_token"))
			.split("=")[1];

		window.location.hash = "";
		window.localStorage.setItem("spotifyToken", token);
	}
};

export const getPlaylistItems = () => {
	let token = window.localStorage.getItem("spotifyToken");
	const playlistId = "6Hq9wYRY3xs8p5SiIUc1Gw";
	const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
	const headers = { Authorization: `Bearer ${token}` };

	fetch(`${endpoint}`, { headers: headers })
		.then(
			(response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Request failed!");
			},
			(networkError) => console.log(networkError.message)
		)
		.then((jsonResponse) => {
			console.log(jsonResponse);
		});

	return <h1>IT WORKED!</h1>;
};
