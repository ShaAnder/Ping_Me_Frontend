import React from "react";
import styles from "../../assets/css/Categories.module.css";
import categories from "./dummyData"; // Default import

const Categories = ({ onCategoryClick }) => {
  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category) => (
        <div
          key={category.id}
          className={styles.categoryCard}
          onClick={() => onCategoryClick(category)}
        >
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
