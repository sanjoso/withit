import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Routes,
} from "react-router-dom";
import { BandView } from "./components/BandView/BandView";
import { SideBar } from "./components/Sidebar/SideBar";

import "./style/main.css";

function App() {
	window.addEventListener("beforeunload", () => {
		window.localStorage.removeItem("spotifyToken");
	});

	return (
		<div className="App">
			<BandView />
			<SideBar />
		</div>
	);
}

export default App;
