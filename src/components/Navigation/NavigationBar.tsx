import { NavLink } from "react-router-dom";
import { User } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHouse,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import "./NavigationBar.css";
import useWindowSize from "../../utils/useWindowSize";

interface Props {
  user: User | null;
}

const NavigationBar = ({ user }: Props) => {
  const windowSize = useWindowSize();

  return (
    <div className="nav">
      <div className="icon-container">
        <NavLink to="/">
          <FontAwesomeIcon
            icon={faHouse}
            style={{ marginRight: `${windowSize.width > 520 ? "1rem" : "0"}` }}
          />
          {windowSize.width > 520 && "Home"}
        </NavLink>
      </div>
      <div className="icon-container">
        <NavLink to="/add" className="add-btn">
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{ marginRight: `${windowSize.width > 520 ? "1rem" : "0"}` }}
          />
          {windowSize.width > 520 && "Add"}
        </NavLink>
      </div>
      <div className="icon-container">
        <NavLink to="/favorites">
          <FontAwesomeIcon
            icon={faHeart}
            style={{ marginRight: `${windowSize.width > 520 ? "1rem" : "0"}` }}
          />
          {windowSize.width > 520 && "Favorites"}
        </NavLink>
      </div>
      <div className="icon-container">
        <NavLink to="/settings">
          <img
            src={user?.photoURL ? user.photoURL : ""}
            alt="profile-picture"
            style={{ marginRight: `${windowSize.width > 520 ? "1rem" : "0"}` }}
          />
          {windowSize.width > 520 && "Profile"}
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationBar;
