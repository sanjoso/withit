import trackOpenIcon from "./img/track-open.svg";

export const SpotifyTrack = (props) => {
	const track = props.track;

	return (
		<div className="spotifytrack">
			<div className={"spotifytrack__artwork"}>
				<img src={track.track.album.images[0].url} alt="" />
			</div>
			<div className="spotifytrack__title">{track.track.name}</div>
			<div className="spotifytrack__artist">{track.track.artists[0].name}</div>
			<div className="spotifytrack__date">Nov 10</div>
			<div className="spotifytrack__link">
				<a href={track.track.uri}>
					<img src={trackOpenIcon} alt="" />
				</a>
			</div>
		</div>
	);
};
