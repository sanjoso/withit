import playbutton from "./img/playbutton.svg";
import likebutton from "./img/likebutton.svg";

const { format } = require("date-fns");

export const SpotifyTrack = (props) => {
	const track = props.track;
	const trackNumber = props.number;

	function duration(millis) {
		let minutes = Math.floor(millis / 60000);
		let seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}

	function formatTrackNum(trackNumber) {
		let realNum = trackNumber + 1;
		if (realNum < 10) {
			return `0${realNum}`;
		}
		return realNum;
	}

	return (
		<div className="spotifytrack">
			<div className="spotifytrack__number">{formatTrackNum(trackNumber)}</div>
			<div className="spotifytrack__artwork">
				<img src={track.track.album.images[0].url} alt="" />
			</div>
			<div className="spotifytrack__title">{track.track.name}</div>
			<div className="spotifytrack__artist">
				{track.track.artists[0].name} -{" "}
				{track.track.album.album_type.charAt(0).toUpperCase() +
					track.track.album.album_type.slice(1)}
			</div>
			<div className="spotifytrack__date">
				{format(new Date(track.added_at.substring(0, 10)), "MMM d")}
			</div>
			<div className="spotifytrack__duration">
				{duration(track.track.duration_ms)}
			</div>
			<div className="spotifytrack__play">
				<img src={playbutton} alt="" />
			</div>
			<div className="spotifytrack__like">
				<img src={likebutton} alt="" />
			</div>
		</div>
	);
};
