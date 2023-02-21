// Redux imports
import {
	fetchSearchResults,
	selectArtistResults,
	selectPlaylistResults,
} from "./redux/searchSlice";
import { chooseSubscription } from "./redux/choiceSlice";

// Icon imports
import clearicon from "./img/xWHITE.svg";
import artisticon from "./img/artisticon.svg";
import playlisticon from "./img/playlisticon.svg";

// Hook imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Electron preload.js imports
const writeJSON = window.electron.writeJSON;
const readJSON = window.electron.readJSON;

export const SpotifyPopup = (props) => {
	const dispatch = useDispatch();
	const playlistResults = useSelector(selectPlaylistResults);
	const artistResults = useSelector(selectArtistResults);
	const [searchQuery, setSearchQuery] = useState("Search Spotify...");
	const [subscriptions, setSubscriptions] = useState("");
	const [searchResults, setSearchResults] = useState("");
	const [searchResultsExist, setSearchResultsExist] = useState(false);

	useEffect(() => {
		readJSON().then((response) => {
			const subsParsed = JSON.parse(response);
			let subsArray = [];
			Object.values(subsParsed).forEach((val) => {
				subsArray.push(val);
			});
			setSubscriptions(subsArray);
		});

		if (artistResults || playlistResults) {
			setSearchResultsExist(true);
			let resultsArray = [];
			artistResults.map((result) => {
				return resultsArray.push(result);
			});
			playlistResults.map((result) => {
				return resultsArray.push(result);
			});
			setSearchResults(resultsArray);
		}
	}, [artistResults, playlistResults]);

	// What to do when a sub is clicked
	function handleSelect(uri, type) {
		dispatch(chooseSubscription([uri, type]));
	}

	// Search input functions
	function handleSearchChange(event) {
		setSearchQuery(event.target.value);
		if (searchQuery.length < 2) {
			setSearchResultsExist(false);
		}
	}
	function handleSearchActivateClick() {
		if (searchQuery === "Search Spotify...") {
			setSearchQuery("");
		}
	}
	function handleSearchClearClick(event) {
		setSearchQuery("Search Spotify...");
		setSearchResultsExist(false);
	}
	function handleSearchSubmit(event) {
		event.preventDefault();
		dispatch(fetchSearchResults(searchQuery));
	}

	// Function to handle when a current or new subscription is toggled on or off
	function handleToggle(event) {
		const name = event.target.id;
		const toggled = event.target.checked;

		let subsArray = [];
		Object.values(subscriptions).forEach((val) => {
			subsArray.push(val);
		});
		//when slider is toggled to on
		if (toggled === true) {
			//if the element is already in subscriptions, then do nothing
			const subscriptionMatch = subsArray.find((ele) => ele.name === name);
			if (subscriptionMatch) {
				return;
			}

			const artistMatch = artistResults.find((ele) => ele.name === name);
			const playlistMatch = playlistResults.find((ele) => ele.name === name);
			if (artistMatch) {
				let uri = artistMatch.uri;
				const newSub = { name: name, uri: uri, type: "artist" };
				subsArray.push(newSub);
			} else {
				let uri = playlistMatch.uri;
				const newSub = { name: name, uri: uri, type: "playlist" };
				subsArray.push(newSub);
			}
			writeJSON(JSON.stringify(subsArray));
			setSubscriptions(subsArray);
		}

		if (toggled === false) {
			const match = subsArray.find((ele) => ele.name === name);
			const matchIndex = subsArray.indexOf(match);
			const newSubsList = subsArray.filter((_, index) => index !== matchIndex);
			writeJSON(JSON.stringify(newSubsList));
			setSubscriptions(newSubsList);
		}
	}

	return (
		<div id="spotifypopup">
			<div id="spotifypopup_searchbar">
				<div id="spotifypopup__searchbar__search">
					<form onSubmit={handleSearchSubmit}>
						<input
							type="text"
							value={searchQuery}
							onChange={handleSearchChange}
							onClick={handleSearchActivateClick}
						/>
						<span>
							<img
								id="spotifypopup__searchbar__search__clearicon"
								src={clearicon}
								alt=""
								onClick={handleSearchClearClick}
								style={{ display: searchQuery ? "block" : "none" }}
							/>
						</span>
					</form>
				</div>
			</div>
			<div id="spotifypopup__subscriptionscontainer">
				<ul>
					{searchResultsExist
						? searchResults.map((key) => {
								return (
									<li key={key.uri}>
										<p>{key.name}</p>
										<img
											src={key.type === "artist" ? artisticon : playlisticon}
											alt=""
										/>
										<input
											type="checkbox"
											id={key.name}
											onChange={handleToggle}
										/>
										<label htmlFor={key.name}>Toggle</label>
									</li>
								);
						  })
						: Object.values(subscriptions).map((value) => {
								return (
									<li
										key={value.uri}
										onClick={() => handleSelect(value.uri, value.type)}
									>
										<p>{value.name}</p>
										<img
											src={value.type === "artist" ? artisticon : playlisticon}
											alt=""
										/>

										<input
											type="checkbox"
											id={value.name}
											onChange={handleToggle}
										/>
										<label htmlFor={value.name}>Toggle</label>
									</li>
								);
						  })}
				</ul>
			</div>
		</div>
	);
};
