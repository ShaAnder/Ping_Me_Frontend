import styles from "../../assets/css/popularServers.module.css";

function PopularServers({ servers }) {
  return (
    <div className={styles.popularServersContainer}>
      {servers.map((server) => (
        <div key={server.id} className={styles.serverCard}>
          <img
            src={server.iconUrl || "/placeholder.jpg"}
            alt={server.name}
            className={styles.serverIcon}
          />
          <div>{server.name}</div>
        </div>
      ))}
    </div>
  );
}

export default PopularServers;
