import { getPlaylistItems } from "./SpotifyUtils";
import albumArtwork from "./firm foundation artwork.jpg";
import trackOpenIcon from "./img/track-open.svg";

export const SpotifyMain = () => {
	return (
		<div className="spotifymain">
			<div className="spotifymain__track">
				<div className="spotifymain__track__artwork">
					<img src={albumArtwork} alt="" />
				</div>
				<div className="spotifymain__track__title">Firm Foundation</div>
				<div className="spotifymain__track__artist">Elevation Worship</div>
				<div className="spotifymain__track__date">Nov 10</div>
				<div className="spotifymain__track__link">
					<img src={trackOpenIcon} alt="" />
				</div>
			</div>
		</div>
	);
};
