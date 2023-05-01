import menuicon from "./img/menuicon.svg";

import { SpotifyContainer } from "../Spotify/SpotifyContainer";
import { YouTubeContainer } from "../YouTube/YouTubeContainer";
import { InstagramContainer } from "../Instagram/InstagramContainer";

export const BandView = (props) => {
	return (
		<div id="bandview">
			<div id="bandview__youtube">
				<YouTubeContainer />
			</div>
			<div id="bandview__spotify">
				<SpotifyContainer />
			</div>
			<div id="bandview__instagram">
				<div id="bandview__instagram__title">
					<InstagramContainer />
				</div>
			</div>
		</div>
	);
};
