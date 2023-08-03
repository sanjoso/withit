import { useEffect } from "react";

import { authenticateInstagram } from "./InstagramUtils";
const getInstagramToken = window.electron.getInstagramToken;

export const InstagramContainer = () => {
	async function handleLogin(event) {
		const code = await getInstagramToken();
		window.localStorage.setItem("instagramCode", code);
	}

	return (
		<div id="instagramcontainer">
			<button onClick={handleLogin}>Log in to Instagram</button>
		</div>
	);
};
