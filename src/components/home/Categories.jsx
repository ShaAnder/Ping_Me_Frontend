import styles from "../../assets/css/Categories.module.css";

function Categories({ categories, onSelectCategory, selected }) {
  return (
    <div className={styles.selectorWrapper}>
      <h2>Explore</h2>
      <hr></hr>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.categoryButton} ${
            selected === cat.name ? styles.active : ""
          }`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
