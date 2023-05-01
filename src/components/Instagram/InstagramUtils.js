const clientId = "1355978245262681";
const redirectUri = "https://localhost:3000/";
const scopes = "user_profile,user_media";
const clientSecret = "cf28e0c9f49deb958cf22a00020da6b9";
const responseType = "code";
const codeEndpoint = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=${responseType}`;
const accessTokenEndpoint = "https://api.instagram.com/oauth/access_token";

export const getInstagramToken = () => {
	//let token = window.localStorage.getItem("instagramToken");

	//Step 1: Get code from Instagram
	window.location = codeEndpoint;
	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");
	console.log(code);

	//Step 2: Now, exchange that code for an access token, and store it
	const accessTokenParams = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: redirectUri,
		grant_type: "authorization_code",
		code: code,
	});

	fetch(accessTokenEndpoint, {
		method: "POST",
		body: accessTokenParams,
	})
		.then((response) => response.json())
		.then((data) =>
			window.localStorage.setItem("instaToken", data.access_token)
		)
		.catch((error) => console.log(error));
};

//from ChatGPT
