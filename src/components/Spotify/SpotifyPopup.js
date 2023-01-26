import {
	fetchSearchResults,
	selectArtistResults,
	selectPlaylistResults,
} from "./searchSlice";

import checkmark from "./img/check.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const readJSON = window.electron.readJSON;

export const SpotifyPopup = (props) => {
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState("Search Spotify...");
	const [subscriptions, setSubscriptions] = useState("");

	useEffect(() => {
		readJSON().then((response) => {
			const subsParsed = JSON.parse(response);
			setSubscriptions(subsParsed.items);
		});
	}, []);

	function handleChange(event) {
		setSearchQuery(event.target.value);
	}

	function handleClick() {
		if (searchQuery === "Search Spotify...") {
			setSearchQuery("");
		}
	}

	function handleSubmit(event) {
		setSearchQuery(event.target.value);
		dispatch(fetchSearchResults(searchQuery));
	}

	return (
		<div className="spotifypopup">
			<div className="spotifypopup__title">Spotify</div>
			<div className="spotifypopup_searchbar">
				<div className="spotifypopup__searchbar__search">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={searchQuery}
							onChange={handleChange}
							onClick={handleClick}
						/>
					</form>
				</div>
				<div className="spotifypopup__subscriptionscontainer">
					<ul>
						{Object.keys(subscriptions).map((key, index) => {
							return (
								<li key={index}>
									<p>{key}</p>
									<img src="" alt="" />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
