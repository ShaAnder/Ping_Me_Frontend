import styles from "../../assets/css/channelList.module.css";
import dummyUser from "../../dummyData/dummyUserData";

function ChannelList({ serverId }) {
  const server = dummyUser.servers.find((s) => s.id === serverId);

  return (
    <div className={styles.channelList}>
      <h3>{server.name}</h3>
      <ul>
        {server.channels.map((channel) => (
          <li key={channel.id} className={styles.channelItem}>
            #{channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelList;
