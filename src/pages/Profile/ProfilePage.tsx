import { Button } from "@mui/material";
import { useState } from "react";
import AnimatedPage from "../../components/AnimatedPage";
import CustomImage from "../../components/CustomImage";
import { auth } from "../../config/firebase";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [user] = useState(auth.currentUser);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
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
