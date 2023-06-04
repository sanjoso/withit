import { useRef } from "react";

import { useClickOutsideHook } from "../../hooks/useClickOutsideHook";

export const YouTubePlayer = ({ videoId, title, handleClickOutsidePlayer }) => {
	// const videoId = props.videoId;
	// const title = props.title;
	const clickRef = useRef(null);
	const clickedOutside = useClickOutsideHook(clickRef);
	if (clickedOutside) {
		handleClickOutsidePlayer(false);
	}

	return (
		<div id="youtubeplayer" ref={clickRef}>
			<div id="youtubeplayer__video">
				<iframe
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};
