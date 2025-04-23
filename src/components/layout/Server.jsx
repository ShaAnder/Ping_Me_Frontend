import NavMain from "../shared/Nav";
import ServerList from "../shared/ServerList";
import ChannelList from "../guild/ChannelList";
import Channel from "../guild/Channel";
import MemberList from "../guild/MemberList";

import styles from "../../assets/css/server.module.css";

function Server() {
  return (
    <>
      <NavMain />
      <div className={styles.serverContainer}>
        <ServerList />
        <ChannelList />
        <Channel channelId={1} />
        <MemberList />
      </div>
    </>
  );
}

export default Server;
