import {
	fetchSearchResults,
	selectArtistResults,
	selectPlaylistResults,
} from "./searchSlice";

//import checkmark from "./img/check.svg";
import deleteicon from "./img/delete.png";
import artisticon from "./img/artisticon.svg";
import clearicon from "./img/x.svg";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const readJSON = window.electron.readJSON;

export const SpotifyPopup = (props) => {
	const dispatch = useDispatch();
	const playlistResults = useSelector(selectPlaylistResults);
	const artistResults = useSelector(selectArtistResults);
	const [searchQuery, setSearchQuery] = useState("Search Spotify...");
	const [subscriptions, setSubscriptions] = useState("");
	const [searchResults, setSearchResults] = useState(false);

	useEffect(() => {
		readJSON().then((response) => {
			const subsParsed = JSON.parse(response);
			setSubscriptions(subsParsed);
		});

		if (artistResults) {
			setSearchResults(true);
		}
	}, [artistResults]);

	function handleChange(event) {
		setSearchQuery(event.target.value);
	}

	function handleClick() {
		if (searchQuery === "Search Spotify...") {
			setSearchQuery("");
		}
	}

	function handleClearClick() {
		setSearchQuery("");
		setSearchResults(false);
	}

	function handleSearchSubmit(event) {
		event.preventDefault();
		dispatch(fetchSearchResults(searchQuery));
	}

	return (
		<div id="spotifypopup">
			<div id="spotifypopup__title">Spotify</div>
			<div id="spotifypopup_searchbar">
				<div id="spotifypopup__searchbar__search">
					<form onSubmit={handleSearchSubmit}>
						<input
							type="text"
							value={searchQuery}
							onChange={handleChange}
							onClick={handleClick}
						/>
						<span>
							<img
								id="spotifypopup__searchbar__search__clearicon"
								src={clearicon}
								alt=""
								onClick={handleClearClick}
								style={{ display: searchQuery ? "block" : "none" }}
							/>
						</span>
					</form>
				</div>
				<div id="spotifypopup__subscriptionscontainer">
					<ul>
						{searchResults
							? artistResults.map((key, index) => {
									return (
										<li key={index}>
											<p>{key.name}</p>
											<img src={deleteicon} alt="" />
										</li>
									);
							  })
							: Object.values(subscriptions).map((value, index) => {
									return (
										<li key={index}>
											<p>{value.name}</p>
											<img src={deleteicon} alt="" />
										</li>
									);
							  })}
					</ul>
				</div>
			</div>
		</div>
	);
};
