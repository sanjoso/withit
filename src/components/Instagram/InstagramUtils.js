const getInstagramToken = window.electron.getInstagramToken;

const clientId = "1355978245262681";
const redirectUri = "https://localhost:3000/";
const scopes = "user_profile,user_media";
const clientSecret = "cf28e0c9f49deb958cf22a00020da6b9";
const responseType = "code";
// const accessTokenEndpoint = "https://api.instagram.com/oauth/access_token";

export const authenticateInstagram = () => {
	//Step 1: Get code from Instagram
	window.location = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scopes}`;
	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");
	console.log(code);
	const ipcData = {
		clientId: clientId,
		redirectUri: redirectUri,
		clientSecret: clientSecret,
		code: code,
	};

	//Step 2: Now, exchange that code for an access token, and store it via ipc
	if (code) {
		setTimeout(() => {
			getInstagramToken(ipcData);
		}, 3000);
	}
};
