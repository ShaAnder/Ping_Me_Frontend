import { Link } from "react-router-dom";
import styles from "../../assets/css/serverList.module.css";

import swordImg from "../../assets/img/sword.jpg";

const servers = [
  { id: "1", name: "Guild One", hasNewMessages: true, iconUrl: null },
  {
    id: "2",
    name: "Raiders HQ",
    hasNewMessages: false,
    iconUrl: swordImg,
  },
  { id: "3", name: "PvP Arena", hasNewMessages: false, iconUrl: null },
];

function ServerList() {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.serverItemWrapper}>
        <div className={styles.icon}>🏠</div>
      </Link>

      <hr className={styles.separator} />

      {servers.map((server) => {
        const initials = server.name
          .split(" ")
          .slice(0, 3)
          .map((word) => word[0])
          .join("")
          .toUpperCase();

        return (
          <Link
            to={`/server/${server.id}`}
            key={server.id}
            className={styles.serverItemWrapper}
          >
            {server.hasNewMessages && (
              <div className={styles.notificationDot} />
            )}
            <div className={styles.icon}>
              {server.iconUrl ? (
                <img
                  src={server.iconUrl}
                  alt={server.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                initials
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ServerList;
