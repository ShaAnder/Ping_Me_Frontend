import React from "react";
import styles from "../../assets/css/popularServers.module.css";

const PopularServers = ({ category }) => {
  return (
    <div className={styles.popularServersContainer}>
      <h3>Popular Servers in {category.name}</h3>
      <ul>
        {category.popularServers.map((server) => (
          <li key={server.id}>{server.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularServers;
