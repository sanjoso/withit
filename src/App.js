import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Routes,
} from "react-router-dom";
import { BandView } from "./components/BandView/BandView";
import { TitleBar } from "./components/Titlebar/TitleBar";

import "./style/main.css";

function App() {
	window.addEventListener("beforeunload", () => {
		window.localStorage.removeItem("spotifyToken");
	});

	return (
		<div className="App">
			<TitleBar />
			<BandView />
		</div>
	);
}

export default App;
