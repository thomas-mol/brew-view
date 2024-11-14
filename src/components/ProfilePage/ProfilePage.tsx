import { motion } from "framer-motion";
import { auth } from "../../config/firebase";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="page">
        <h2>Profile of {auth.currentUser?.displayName} </h2>
        <img src={auth.currentUser?.photoURL || ""} alt="" />
        <p>ID : {auth.currentUser?.uid}</p>
        <p>Email : {auth.currentUser?.email}</p>
        <p>{auth.currentUser?.phoneNumber}</p>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
