import { Box } from "@mui/material";

import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";

import UserServer from "../components/serverList/UserServers";
import Explore from "../components/primaryDraw/Explore";
import ExplorePopularServers from "../components/main/PopularServers";
import UserPanel from "../components/shared/UserPanel";

const Home = () => {
  return (
    <>
      <Nav serverName="PingMe Home" />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Sidebar - Server List */}
        <ServerList>
          <UserServer />
        </ServerList>
        {/* Explore Section - Primary Drawer */}
        <PrimaryDraw>
          <Explore />
        </PrimaryDraw>

        {/* Drawer - Popular Servers */}
        <Main>
          <ExplorePopularServers />
        </Main>
      </Box>
      <UserPanel />
    </>
  );
};

export default Home;
