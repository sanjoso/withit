import { useState } from "react";

import { YouTubePlayer } from "./YouTubePlayer";

const { format } = require("date-fns");

export const YouTubeVideoCard = (props) => {
	const title = props.video.snippet.title;
	const thumbnail = props.video.snippet.thumbnails.medium.url;
	const date = props.video.snippet.publishedAt;
	const videoId = props.video.id.videoId;
	const [player, togglePlayer] = useState(false);

	function handleClick(event) {
		togglePlayer(true);

		const handlePlayerEscape = (event) => {
			if (event.keyCode === 27) {
				togglePlayer(false);
			}
		};
		window.addEventListener("keydown", handlePlayerEscape);

		return () => {
			window.removeEventListener("keydown", handlePlayerEscape);
		};
	}

	function handleClickOutsidePlayer(click) {
		togglePlayer(false);
	}

	return (
		<div id="youtubevideocard" onClick={handleClick}>
			{player ? (
				<YouTubePlayer
					videoId={videoId}
					title={title}
					handleClickOutsidePlayer={handleClickOutsidePlayer}
				/>
			) : null}

			<div id="youtubevideocard__thumbnail">
				<img src={thumbnail} alt="" />
			</div>
			<div id="youtubevideocard__title">{title}</div>
			<div id="youtubevideocard__date">
				{format(new Date(date.substring(0, 10)), "MMM d yyyy")}
			</div>
		</div>
	);
};
