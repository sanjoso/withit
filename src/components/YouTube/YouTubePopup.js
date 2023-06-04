// Redux imports
import { BVYouTubeChooseSubscription } from "./redux/BVYouTubeChoiceSlice";
import {
	fetchBVYouTubeChannels,
	selectBVYouTubeChannels,
} from "./redux/BVYouTubeChannelSearchSlice";

// Icon imports
import clearicon from "../../img/x.svg";
import youtubeicon from "../../img/youtubeicon.svg";
import searchicon from "../../img/searchicon.svg";

// Hook imports
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutsideHook } from "../../hooks/useClickOutsideHook";

// Electron preload.js imports
const writeBVYouTubeSubs = window.electron.writeBVYouTubeSubs;
const readBVYouTubeSubs = window.electron.readBVYouTubeSubs;

export const YouTubePopup = ({ handleClickOutsidePopup }) => {
	const dispatch = useDispatch();
	const channelResults = useSelector(selectBVYouTubeChannels);
	const [searchQuery, setSearchQuery] = useState("Search YouTube...");
	const [subscriptions, setSubscriptions] = useState("");
	const [searchResults, setSearchResults] = useState("");
	const [searchResultsExist, setSearchResultsExist] = useState(false);
	const clickRef = useRef(null);

	//Handles the popup closing when the user clicks outside of it
	const clickedOutside = useClickOutsideHook(clickRef);
	if (clickedOutside) {
		handleClickOutsidePopup(false);
	}

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const response = await readBVYouTubeSubs();
			const subsParsed = JSON.parse(response);
			const subsArray = Object.values(subsParsed);
			setSubscriptions(subsArray);
		};
		fetchSubscriptions();

		if (channelResults.length > 0) {
			setSearchResultsExist(true);
			const resultsArray = [...channelResults];
			setSearchResults(resultsArray);
		}
	}, [channelResults]);

	// Sub is selected function
	function handleSelect(value) {
		dispatch(BVYouTubeChooseSubscription(value));
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
			dispatch(fetchBVYouTubeChannels(searchQuery));
		}
	}

	// Function to handle when a current or new subscription is toggled on or off
	function handleToggle(event) {
		const channelId = event.target.getAttribute("channelid");
		const name = event.target.name;
		const toggled = event.target.checked;

		let subsArray = [...subscriptions]; // create a copy of subscriptions array

		// when slider is toggled to on
		if (toggled === true) {
			// if the element is already in subscriptions, then do nothing
			const subscriptionMatch = subsArray.find((ele) => ele.name === name);
			if (subscriptionMatch) {
				return;
			} else {
				const newSub = {
					name: name,
					channelId: channelId,
				};
				subsArray.push(newSub);
			}
			writeBVYouTubeSubs(JSON.stringify(subsArray));
			setSubscriptions(subsArray); // set updated subscriptions array
		}

		if (toggled === false) {
			const match = subsArray.find((ele) => ele.name === name);
			const matchIndex = subsArray.indexOf(match);
			const newSubsList = subsArray.filter((_, index) => index !== matchIndex);
			writeBVYouTubeSubs(JSON.stringify(newSubsList));
			setSubscriptions(newSubsList); // set updated subscriptions array
		}
	}
	return (
		<div id="spotifypopup" ref={clickRef}>
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
									<li key={item.snippet.channelId}>
										<p>{item.snippet.channelTitle}</p>
										<img src={youtubeicon} alt="" />
										<label htmlFor={`checkbox-${index}`}>
											<input
												type="checkbox"
												id={`checkbox-${index}`}
												channelid={item.snippet.channelId}
												name={item.snippet.channelTitle}
												onClick={handleToggle}
											/>
											<span className="checkbox" />
										</label>
									</li>
								);
						  })
						: Object.values(subscriptions).map((value) => {
								return (
									<li key={value.channelId} onClick={() => handleSelect(value)}>
										<p>{value.name}</p>
										<img src={youtubeicon} alt="" />
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
