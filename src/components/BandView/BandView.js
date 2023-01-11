import dropdowncarat from "./img/dropdowncarat.png";

import { SpotifyContainer } from "../Spotify/SpotifyContainer";

export const BandView = (props) => {
	return (
		<div id="bandview">
			<div id="bandview__youtube">
				<div id="bandview__youtube__title">
					YouTube
					<img src={dropdowncarat} alt="" />
				</div>
			</div>
			<div id="bandview__spotify">
				<SpotifyContainer />
			</div>
			<div id="bandview__instagram">
				<div id="bandview__instagram__title">
					Instagram
					<img src={dropdowncarat} alt="" />
				</div>
			</div>
		</div>
	);
};
