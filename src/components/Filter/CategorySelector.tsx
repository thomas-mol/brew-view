import "./CategorySelector.css";

const CategorySelector = () => {
  const categories = ["cappucino", "flat white", "americano", "latte", "iced"];

  return (
    <div className="category-selector">
      <div className="category-heading">
        <p>Category</p>
        <a href="#">View all</a>
      </div>
      <div className="category-carousel">
        {categories.map((category, index) => (
          <div key={index} className="carousel-item">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
