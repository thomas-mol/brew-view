import {
  faHeart,
  faHouse,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../utils/useWindowSize";
import styles from "./NavigationBar.module.css";

const Links = [
  {
    name: "Home",
    ref: "/",
    icon: faHouse,
  },
  {
    name: "Add",
    ref: "/add",
    icon: faSquarePlus,
  },
  {
    name: "Favorites",
    ref: "/favorites",
    icon: faHeart,
  },
  {
    name: "Profile",
    ref: "/profile",
    icon: faUser,
  },
];

const NavigationBar = () => {
  const windowSize = useWindowSize();

  return (
    <div className={styles.navigation}>
      {Links.map((link, index) => (
        <div className={styles.iconContainer} key={index}>
          <NavLink
            to={link.ref}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FontAwesomeIcon
              icon={link.icon}
              style={{
                marginRight: `${windowSize.width > 520 ? "1rem" : "0"}`,
              }}
            />
            {windowSize.width > 520 && link.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
