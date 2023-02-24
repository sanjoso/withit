import playicon from "./img/playbutton.svg";
import likeicon from "./img/likebutton.svg";

const { format } = require("date-fns");

export const ArtistTrack = (props) => {
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
		<div className="artisttrack">
			<div className="artisttrack__number">{trackNum()}</div>
			<div className={"artisttrack__artwork"}>
				<img src={track.artwork} alt="" />
			</div>
			<div className="artisttrack__title">{track.name}</div>
			<div className="artisttrack__artist">{track.artist}</div>
			<div className="artisttrack__date">
				{format(new Date(track.releaseDate.substring(0, 10)), "MMM d yyyy")}
			</div>
			<div className="artisttrack__play">
				<a href={track.uri}>
					<img src={playicon} alt="" />
				</a>
			</div>
			<div className="artisttrack__like">
				<a href={track.uri}>
					<img src={likeicon} alt="" />
				</a>
			</div>
		</div>
	);
};
