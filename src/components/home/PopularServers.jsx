import styles from "../../assets/css/PopularServers.module.css";

function PopularServers({ servers }) {
  return (
    <div className={styles.popularServersContainer}>
      <div className={styles.serverCards}>
        {servers.map((server) => (
          <div key={server.id} className={styles.serverCard}>
            {/* Server Banner */}
            <div className={styles.serverBannerWrapper}>
              <img
                src={
                  server.server_image_urls?.banner_image_url ||
                  "/placeholder-banner.jpg"
                }
                alt={`Banner for ${server.name}`}
                className={styles.serverBanner}
              />
            </div>
            {/* Server Icon */}
            <div className={styles.serverIconWrapper}>
              <img
                src={
                  server.server_image_urls?.server_icon_url ||
                  "/placeholder-icon.jpg"
                }
                alt={`Icon for ${server.name}`}
                className={styles.serverIcon}
              />
            </div>
            {/* Server Info */}
            <div className={styles.serverInfo}>
              <div className={styles.serverName}>{server.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularServers;
