import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavigationBar.css";
import {
  faBars,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  return (
    <div className="nav">
      <div className="icon-container">
        <FontAwesomeIcon icon={faHouse} />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faSquarePlus} />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default NavigationBar;
