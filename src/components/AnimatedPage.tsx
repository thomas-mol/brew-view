import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  children: ReactNode;
  title?: string;
  className?: string;
}

const AnimatedPage = ({ children, title, className }: Props) => {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {title && (
        <h2
          style={{
            padding: "1rem 1.5rem",
            fontSize: "1.5rem",
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
