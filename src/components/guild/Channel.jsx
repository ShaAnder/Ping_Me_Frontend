import styles from "../../assets/css/channel.module.css";
import dummyUser from "../../dummyData/dummyUserData";

function Channel({ serverId, channelId }) {
  const server = dummyUser.servers.find((s) => s.id === serverId);
  const messages = server?.messages?.[channelId] || [];

  return (
    <div className={styles.channel}>
      <div className={styles.chatHeader}>#{channelId}</div>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel;
