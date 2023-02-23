// Redux imports
import {
	fetchSearchResults,
	selectArtistResults,
	selectPlaylistResults,
} from "./redux/searchSlice";
import { chooseSubscription } from "./redux/choiceSlice";

// Icon imports
import clearicon from "./img/x.svg";
import artisticon from "./img/artisticon.svg";
import playlisticon from "./img/playlisticon.svg";
import searchicon from "./img/searchdark.svg";

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
	const [activeCategoryName, setActiveCategoryName] = useState("Everything");
	const [activeCategorySubs, setActiveCategorySubs] = useState("");

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
	}, [artistResults, playlistResults, activeCategorySubs]);

	// Sub is selected function
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
		setSearchQuery("");
		setSearchResultsExist(false);
	}
	function handleSearchSubmit(event) {
		event.preventDefault();
		dispatch(fetchSearchResults(searchQuery));
	}

	//Category toggle function
	function handleCategoryToggle(event) {
		const listItem = event.target.closest("li");
		const listItems = document.querySelectorAll(
			".spotifypopup__categories__category"
		);
		listItems.forEach((item) => {
			if (item !== listItem) {
				item.classList.remove("spotifypopup__categories__category__selected");
			}
		});

		listItem.classList.toggle("spotifypopup__categories__category__selected");

		if (event.target.innerHTML === "Everything") {
			setActiveCategorySubs(subscriptions);
		} else {
			setActiveCategorySubs(
				Object.values(subscriptions).filter((subscription) => {
					return (
						subscription.type ===
						event.target.innerHTML.toLowerCase().slice(0, -1)
					);
				})
			);
		}
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
					<div id="spotifypopup__searchbar__search__searchicon">
						<img src={searchicon} alt="" />
					</div>
					<form onSubmit={handleSearchSubmit}>
						<input
							type="text"
							value={searchQuery}
							onChange={handleSearchChange}
							onClick={handleSearchActivateClick}
						/>
					</form>
					<div id="spotifypopup__searchbar__search__clearicon">
						<img
							src={clearicon}
							alt=""
							onClick={handleSearchClearClick}
							style={{ opacity: searchQuery ? "1" : "0" }}
						/>
					</div>
				</div>
			</div>

			<div id="spotifypopup__categories">
				<ul>
					<li
						className="spotifypopup__categories__category spotifypopup__categories__category__selected"
						onMouseDown={handleCategoryToggle}
						id="everthing__category"
					>
						<p>Everything</p>
					</li>
					<li
						className="spotifypopup__categories__category"
						onMouseDown={handleCategoryToggle}
					>
						<p>Artists</p>
					</li>
					<li
						className="spotifypopup__categories__category"
						onMouseDown={handleCategoryToggle}
						id="playlists__category"
					>
						<p>Playlists</p>
					</li>
				</ul>
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
									</li>
								);
						  })
						: Object.values(activeCategorySubs).map((value) => {
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
									</li>
								);
						  })}
				</ul>
			</div>
		</div>
	);
};
