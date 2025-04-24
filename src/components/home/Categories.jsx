import styles from "../../assets/css/Categories.module.css";

function Categories({ categories, onSelectCategory, selected }) {
  return (
    <div className={styles.selectorWrapper}>
      <h2>Explore</h2>
      <hr></hr>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.categoryButton} ${
            selected === cat ? styles.active : ""
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Categories;
