import styles from "../../assets/css/PopularServers.module.css";

function PopularServersHeader({ category }) {
  return (
    <div className={styles.textContainer}>
      <h1>Popular Servers</h1>
      <h3>Servers Talking about {category}</h3>
    </div>
  );
}

export default PopularServersHeader;
