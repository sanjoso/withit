import bandButton from "./img/bandtab.svg";
import churchButton from "./img/churchtab.svg";
import leaderButton from "./img/leadertab.svg";
import logo from "./img/logo.png";

export const SideBar = (props) => {
	return (
		<div className="sidebar">
			<div className="sidebar__logo">
				<img src={logo} alt="" />
			</div>

			<div className="sidebar__nav">
				<div className="sidebar__nav__buttoncontainer sidebar__nav__buttoncontainer__active">
					<div className="sidebar__nav__button">
						<img src={bandButton} alt="" />
					</div>
				</div>
				<div className="sidebar__nav__buttoncontainer">
					<div className="sidebar__nav__button">
						<img src={churchButton} alt="" />
					</div>
				</div>
				<div className="sidebar__nav__buttoncontainer">
					<div className="sidebar__nav__button">
						<img src={leaderButton} alt="" />
					</div>
				</div>
			</div>

			<div className="sidebar__settingsbutton"></div>
		</div>
	);
};
