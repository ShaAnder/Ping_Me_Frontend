import React from "react";
import styles from "../../assets/css/memberList.module.css";
import dummyUser from "../../dummyData/dummyUserData";

function MemberList({ serverId }) {
  const server = dummyUser.servers.find((s) => s.id === serverId);

  return (
    <div className={styles.memberList}>
      <h3 className={styles.title}>Members</h3>
      <ul>
        {server.users.map((user) => (
          <li key={user.id} className={styles.memberItem}>
            <div className={styles.memberIcon}>{user.username[0]}</div>
            <span className={styles.memberName}>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
