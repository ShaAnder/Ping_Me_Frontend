import styles from "../../assets/css/popularServers.module.css";
import dummyUser from "../../dummyData/dummyUserData";

function PopularServers({ category }) {
  const servers = dummyUser.servers.filter((s) => s.category === category);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Popular Servers in {category}</h3>
      <ul className={styles.list}>
        {servers.map((server) => (
          <li key={server.id} className={styles.item}>
            {server.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularServers;
