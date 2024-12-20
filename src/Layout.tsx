import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { auth } from "./config/firebase";

const Layout = () => {
  const user = auth.currentUser;

  return (
    <>
      <div id="main">
        <div className="home-heading">
          <h1>
            <b>Brew</b>View
          </h1>
        </div>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
      <div className="margin-div"></div>
      <NavigationBar user={user} />
    </>
  );
};

export default Layout;
