import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import AnimatedPage from "../../components/AnimatedPage";
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
        <Card>
          <CardMedia
            sx={{ height: 300 }}
            image={
              user?.photoURL ||
              `https://eu.ui-avatars.com/api/?name=${
                auth.currentUser?.email || ""
              }&size=150`
            }
            title="profile picture"
          />
          <CardContent>
            <p>
              <em>ID:</em> {user?.uid}
            </p>
            <p>
              <em>Email:</em> {user?.email}
            </p>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                alert("⚠️ This feature hasn't been implemented...yet");
              }}
              variant="outlined"
            >
              Edit Profile
            </Button>
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </CardActions>
        </Card>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;
