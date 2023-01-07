import { useState } from "react";
import ellipses from "./img/ellipses.png";

import { SpotifyContainer } from "../Spotify/SpotifyContainer";

export const BandView = (props) => {
	return (
		<div className="bandview">
			<div className="bandview__left">
				<SpotifyContainer />
			</div>

			<div className="bandview__center">
				<div className="bandview__center__titlebar">
					<h3>YOUTUBE</h3>
					<img src={ellipses} alt="" />
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
					<img src={ellipses} alt="" />
				</div>

				<div className="bandview__right__piclist">
					{/* Render piclist component here */}
				</div>
			</div>
		</div>
	);
};
