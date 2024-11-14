import { motion } from "framer-motion";
import "./CategorySelector.css";
import * as Coffee from "../../constants/enums";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategorySelector = ({ onSelectCategory, selectedCategory }: Props) => {
  return (
    <div className="category-selector">
      <div className="category-heading">
        <p>Category</p>
        <button
          className="reset-category-btn"
          onClick={() => onSelectCategory("")}
        >
          View all
        </button>
      </div>
      <div className="category-carousel">
        {Object.values(Coffee.Type).map((category, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: "easeInOut" }}
            onClick={() => onSelectCategory(category)}
            className={
              category === selectedCategory
                ? "carousel-item active"
                : "carousel-item"
            }
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
