import bandButton from './img/bandbutton.png';
import churchButton from './img/churchbutton.png';
import peopleButton from './img/peoplebutton.png';
import settingsButton from './img/settingsbutton.png';

export const TitleBar = (props) => {

    return (
        <div className="titlebar">
            <div className="titlebar__logo">
                <h1>withIt.</h1>
            </div>

            <div className="titlebar__topnav">
                <div className="titlebar__topnav__button">
                    <img src={bandButton} alt="" />
                </div>
                <div className="titlebar__topnav__button">
                    <img src={churchButton} alt="" />
                </div>
                <div className="titlebar__topnav__button">
                    <img src={peopleButton} alt="" />
                </div>
            </div>

            <div className="titlebar__settingsbutton">
                <img src={settingsButton} alt="" />
            </div>
        </div>
    )

}