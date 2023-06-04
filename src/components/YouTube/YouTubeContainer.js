//Redux imports
import {
	fetchBVYouTubeVideos,
	selectBVYouTubeVideos,
} from "./redux/BVYouTubeVideosSlice";
import { selectBVYouTubeChoice } from "./redux/BVYouTubeChoiceSlice";

import { YouTubePopup } from "./YouTubePopup";

import menuicon from "../BandView/img/menuicon.svg";

import { useSelector, useDispatch } from "react-redux";
import {
	selectBVYouTubeChannels,
	fetchBVYouTubeChannels,
} from "./redux/BVYouTubeChannelSearchSlice";
import { useEffect, useState } from "react";
import { YouTubeVideoCard } from "./YouTubeVideoCard";

export const YouTubeContainer = () => {
	const dispatch = useDispatch();
	const results = useSelector(selectBVYouTubeChannels);
	const choice = useSelector(selectBVYouTubeChoice);
	const channelVideos = useSelector(selectBVYouTubeVideos);
	const [popup, setPopup] = useState(false);

	useEffect(() => {
		// Handles when a new sub is chosen
		if (choice !== "") {
			dispatch(fetchBVYouTubeVideos(choice));
		}

		function handlePopupClose(event) {
			if (event.keyCode === 27) {
				setPopup(false);
			}
		}

		window.addEventListener("keydown", handlePopupClose);

		return () => {
			window.removeEventListener("keydown", handlePopupClose);
		};
	}, [choice]);

	function togglePopup() {
		popup ? setPopup(false) : setPopup(true);
	}
	function handleClick(event) {
		dispatch(fetchBVYouTubeChannels());
	}

	function handleClickOutsidePopup(click) {
		setPopup(false);
	}

	return (
		<div id="youtubecontainer">
			{popup ? (
				<YouTubePopup
					service="BVYouTube"
					handleClickOutsidePopup={handleClickOutsidePopup}
				/>
			) : (
				""
			)}
			<div id="youtubecontainer__titlebar">
				<h3>YouTube</h3>
				<img src={menuicon} alt="" onClick={togglePopup} />
			</div>

			<div id="youtubecontainer__videos">
				{channelVideos
					? channelVideos.map((video, index) => {
							return <YouTubeVideoCard video={video} key={index} />;
					  })
					: null}
			</div>
		</div>
	);
};
