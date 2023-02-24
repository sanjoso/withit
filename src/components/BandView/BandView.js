import menuicon from "./img/menuicon.svg";

import { SpotifyContainer } from "../Spotify/SpotifyContainer";

export const BandView = (props) => {
	return (
		<div id="bandview">
			<div id="bandview__youtube">
				<div id="bandview__youtube__title">
					YouTube
					{/* <img src={menuicon} alt="" /> */}
				</div>
			</div>
			<div id="bandview__spotify">
				<SpotifyContainer />
			</div>
			<div id="bandview__instagram">
				<div id="bandview__instagram__title">
					Instagram
					{/* <img src={menuicon} alt="" /> */}
				</div>
			</div>
		</div>
	);
};
