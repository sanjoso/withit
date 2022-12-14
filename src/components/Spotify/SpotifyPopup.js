import trashCan from "./img/delete.png";
import { useState } from "react";

// need to bring in some sort of prop saying what platform we are searching. Maybe declare a state in each component that is past as props to this one.s

export const SpotifyPopup = (props) => {
	const [searchQuery, setSearchQuery] = useState("Search (network)");

	function handleChange(event) {
		setSearchQuery(event.target.value);
	}

	function handleSubmit(event) {
		searchQuery(event.target.value);
		//dispatch the search thunk here
	}

	return (
		<div className="spotifypopup">
			<div className="spotifypopup_searchbar">
				<div className="spotifypopup__searchbar__search">
					<form onSubmit={handleSubmit}>
						<input type="text" value={searchQuery} onChange={handleChange} />
					</form>
				</div>
				<div className="spotifypopup__subscriptionscontainer">
					<p>New Worship Weekly</p>
					<img src={trashCan} alt="" />
				</div>
			</div>
		</div>
	);
};
