import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import styles from "./App.module.css";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>
            <b>Brew</b>View
          </h1>
        </div>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
      <NavigationBar />
    </>
  );
};

export default App;
