import { YouTubePopup } from "./YouTubePopup";

import menuicon from "../BandView/img/menuicon.svg";

import { useSelector, useDispatch } from "react-redux";
import {
	selectBVYouTubeChannels,
	fetchBVYouTubeChannels,
} from "./redux/BVYouTubeChannelSearchSlice";
import { useEffect, useState } from "react";

export const YouTubeContainer = () => {
	const dispatch = useDispatch();
	const results = useSelector(selectBVYouTubeChannels);
	const [popup, setPopup] = useState(false);

	useEffect(() => {});

	function togglePopup() {
		popup ? setPopup(false) : setPopup(true);
	}
	function handleClick(event) {
		dispatch(fetchBVYouTubeChannels());
	}

	return (
		<div id="youtubecontainer">
			{popup ? <YouTubePopup service="BVYouTube" /> : ""}
			<div id="youtubecontainer__titlebar">
				<h3>YouTube</h3>
				<img src={menuicon} alt="" onClick={togglePopup} />
			</div>
		</div>
	);
};
