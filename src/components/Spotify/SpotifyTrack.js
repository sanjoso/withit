import playicon from "./img/play.png";
import likeicon from "./img/like.png";
import albumicon from "./img/album.png";

const { format } = require("date-fns");

export const SpotifyTrack = (props) => {
	const track = props.track;
	const number = props.number;

	function trackNum() {
		let realNum = number + 1;
		if (realNum < 10) {
			realNum = `0${realNum}`;
		}
		return realNum;
	}

	return (
		<div className="spotifytrack">
			<div className="spotifytrack__number">{trackNum()}</div>
			<div className={"spotifytrack__artwork"}>
				<img src={track.track.album.images[0].url} alt="" />
				{track.track.album.album_type !== "single" ? (
					<div className="spotifytrack__albumicon">
						<img src={albumicon} alt="" />
					</div>
				) : (
					""
				)}
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
			<div className="spotifytrack__play">
				<a href={track.track.uri}>
					<img src={playicon} alt="" />
				</a>
			</div>
			<div className="spotifytrack__like">
				<a href={track.track.uri}>
					<img src={likeicon} alt="" />
				</a>
			</div>
		</div>
	);
};
