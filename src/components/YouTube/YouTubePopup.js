// Redux imports
import { BVYouTubeChooseSubscription } from "./redux/BVYouTubeChoiceSlice";

// Icon imports
import clearicon from "../../img/x.svg";
import artisticon from "../../img/artisticon.svg";
import playlisticon from "../../img/playlisticon.svg";
import searchicon from "../../img/searchicon.svg";

// Hook imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Electron preload.js imports
const writeBVYouTubeSubs = window.electron.writeBVYouTubeSubs;
const readBVYouTubeSubs = window.electron.readBVYouTubeSubs;

export const YouTubePopup = (props) => {
	const service = props.service;
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState("Search YouTube...");
	const [subscriptions, setSubscriptions] = useState("");
	const [searchResults, setSearchResults] = useState("");
	const [searchResultsExist, setSearchResultsExist] = useState(false);
	const [activeCategorySubs, setActiveCategorySubs] = useState("");

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const response = await readBVYouTubeSubs();
			const subsParsed = JSON.parse(response);
			const subsArray = Object.values(subsParsed);
			setSubscriptions(subsArray);
		};
		fetchSubscriptions();

		if (searchResults.length > 0) {
			setSearchResultsExist(true);
			const resultsArray = [...searchResults];
			setSearchResults(resultsArray);
		}
	}, [searchResults]);

	// Sub is selected function
	function handleSelect(uri, type) {
		dispatch(BVYouTubeChooseSubscription([uri, type]));
	}

	// Search input functions
	function handleSearchChange(event) {
		const searchValue = event.target.value;
		setSearchQuery(searchValue);
		if (searchValue.length < 2) {
			setSearchResultsExist(false);
		}
	}
	function handleSearchActivateClick() {
		if (searchQuery === "Search YouTube...") {
			setSearchQuery("");
		}
	}
	function handleSearchClearClick(event) {
		setSearchQuery("");
		setSearchResultsExist(false);
	}
	function handleSearchSubmit(event) {
		event.preventDefault();
		if (searchQuery.trim() !== "") {
			//dispatch(fetchBVSpotifySearchResults(searchQuery));
		}
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
		const uri = event.target.uri;
		const name = event.target.name;
		const toggled = event.target.checked;

		let subsArray = [...subscriptions]; // create a copy of subscriptions array

		// when slider is toggled to on
		// if (toggled === true) {
		// 	// if the element is already in subscriptions, then do nothing
		// 	const subscriptionMatch = subsArray.find((ele) => ele.name === name);
		// 	if (subscriptionMatch) {
		// 		return;
		// 	} else {
		// 		const artistMatch = artistResults.find((ele) => ele.name === name);
		// 		const playlistMatch = playlistResults.find((ele) => ele.name === name);
		// 		if (artistMatch) {
		// 			let uri = artistMatch.uri;
		// 			const newSub = { name: name, uri: uri, type: "artist" };
		// 			subsArray.push(newSub);
		// 		} else {
		// 			let uri = playlistMatch.uri;
		// 			const newSub = { name: name, uri: uri, type: "playlist" };
		// 			subsArray.push(newSub);
		// 		}
		// 		writeBVYouTubeSubs(JSON.stringify(subsArray));
		// 		setSubscriptions(subsArray); // set updated subscriptions array
		// 	}
		// }

		// if (toggled === false) {
		// 	const match = subsArray.find((ele) => ele.name === name);
		// 	const matchIndex = subsArray.indexOf(match);
		// 	const newSubsList = subsArray.filter((_, index) => index !== matchIndex);
		// 	writeBVYouTubeSubs(JSON.stringify(newSubsList));
		// 	setSubscriptions(newSubsList); // set updated subscriptions array
		// }
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

			<div id="spotifypopup__subscriptionscontainer">
				<ul>
					{searchResultsExist
						? searchResults.map((item, index) => {
								return (
									<li key={item.uri}>
										<p>{item.name}</p>
										<img
											src={item.type === "artist" ? artisticon : playlisticon}
											alt=""
										/>
										<label htmlFor={`checkbox-${index}`}>
											<input
												type="checkbox"
												id={`checkbox-${index}`}
												uri={item.uri}
												name={item.name}
												onClick={handleToggle}
											/>
											<span className="checkbox" />
										</label>
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
										<label htmlFor={value.uri}>
											<input
												type="checkbox"
												id={value.uri}
												name={value.name}
												onClick={handleToggle}
												defaultChecked
											/>
											<span className="checkbox" />
										</label>
									</li>
								);
						  })}
				</ul>
			</div>
		</div>
	);
};
