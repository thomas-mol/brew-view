import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import { auth } from "../../config/firebase";
import CustomImage from "../../components/CustomImage";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AnimatedPage title={`Profile of ${user?.displayName || "Anonymous"}`}>
      <div className={styles.container}>
        <CustomImage
          src={
            user?.photoURL ||
            `https://eu.ui-avatars.com/api/?name=${
              auth.currentUser?.email || ""
            }&size=150`
          }
        />
        <p>ID: {user?.uid}</p>
        <p>Email: {user?.email}</p>
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;
