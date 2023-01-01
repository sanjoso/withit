// img imports
import dropdownCarat from "./img/dropdowncarat.png";

import { Spotify } from "../Spotify/Spotify";

export const BandView = (props) => {
	return (
		<div className="bandview">
			<div className="bandview__left">
				<div className="bandview__left__titlebar">
					<h3>SPOTIFY</h3>
					<img src={dropdownCarat} alt="" />
				</div>

				<Spotify />
			</div>

			<div className="bandview__center">
				<div className="bandview__center__titlebar">
					<h3>YOUTUBE</h3>
					<img src={dropdownCarat} alt="" />
				</div>
				<div className="bandview__center__videolist">
					{/* Render videolist component here */}
				</div>
			</div>

			<div className="bandview__player">
				{/* Render player component here */}
				<h3>Player</h3>
			</div>

			<div className="bandview__right">
				<div className="bandview__right__titlebar">
					<h3>INSTAGRAM</h3>
					<img src={dropdownCarat} alt="" />
				</div>

				<div className="bandview__right__piclist">
					{/* Render piclist component here */}
				</div>
			</div>
		</div>
	);
};
