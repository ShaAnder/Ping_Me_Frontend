import React from "react";
import styles from "../../assets/css/Categories.module.css";
import dummyUser from "../../dummyData/dummyUserData";

function Categories({ onSelect }) {
  // Derive unique categories from server list
  const categories = Array.from(
    new Set(dummyUser.servers.map((s) => s.category))
  ).map((category, index) => ({
    id: index + 1,
    name: category,
    description: `${category} games and guilds`,
  }));

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={styles.categoryCard}
          onClick={() => onSelect(cat.name)}
        >
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
