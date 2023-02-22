import playicon from "./img/play.png";
import likeicon from "./img/like.png";
import albumicon from "./img/album.png";

const { format } = require("date-fns");

export const PlaylistTrack = (props) => {
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
		<div className="playlisttrack">
			<div className="playlisttrack__number">{trackNum()}</div>
			<div className={"playlisttrack__artwork"}>
				<img src={track.track.album.images[0].url} alt="" />
				{track.track.album.album_type !== "single" ? (
					<div className="playlisttrack__albumicon">
						<img src={albumicon} alt="" />
					</div>
				) : (
					""
				)}
			</div>
			<div className="playlisttrack__title">{track.track.name}</div>
			<div className="playlisttrack__artist">{track.track.artists[0].name}</div>
			<div className="playlisttrack__date">
				{format(new Date(track.added_at.substring(0, 10)), "MMM d")}
			</div>
			<div className="playlisttrack__play">
				<a href={track.track.uri}>
					<img src={playicon} alt="" />
				</a>
			</div>
			<div className="playlisttrack__like">
				<a href={track.track.uri}>
					<img src={likeicon} alt="" />
				</a>
			</div>
		</div>
	);
};
