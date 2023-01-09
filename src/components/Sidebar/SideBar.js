import bandButton from "./img/bandbutton.png";
import churchButton from "./img/churchbutton.png";
import peopleButton from "./img/peoplebutton.png";
import logo from "./img/logo.png";

export const SideBar = (props) => {
	return (
		<div className="sidebar">
			<div className="sidebar__logo">
				<img src={logo} alt="" />
			</div>

			<div className="sidebar__nav">
				<div className="sidebar__nav__button">
					<img src={bandButton} alt="" />
				</div>
				<div className="sidebar__nav__button">
					<img src={churchButton} alt="" />
				</div>
				<div className="sidebar__nav__button">
					<img src={peopleButton} alt="" />
				</div>
			</div>

			<div className="sidebar__settingsbutton"></div>
		</div>
	);
};
