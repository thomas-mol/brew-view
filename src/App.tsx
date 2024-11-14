import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import LoginPage from "./components/LoginPage/LoginPage";
import Layout from "./Layout";

const App = () => {
  const [user] = useAuthState(auth);

  return <>{user ? <Layout /> : <LoginPage />}</>;
};

export default App;
