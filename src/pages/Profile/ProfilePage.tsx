import { motion } from "framer-motion";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="page">
        <h2>Profile of {auth.currentUser?.displayName || "Anonymous"} </h2>
        <img
          src={
            auth.currentUser?.photoURL ||
            `https://eu.ui-avatars.com/api/?name=${
              auth.currentUser?.email || ""
            }&size=150`
          }
          alt="User Avatar"
        />
        <p>ID: {auth.currentUser?.uid}</p>
        <p>Email: {auth.currentUser?.email}</p>
        <p>{auth.currentUser?.phoneNumber || "No phone number provided"}</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
