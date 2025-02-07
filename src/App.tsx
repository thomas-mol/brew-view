import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
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
      <NavigationBar />;
    </>
  );
};

export default App;
