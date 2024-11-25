import { motion } from "framer-motion";

const FavoritesPage = () => {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      🚧 Under Construction 🚧
    </motion.div>
  );
};

export default FavoritesPage;
