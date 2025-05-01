import { Box } from "@mui/material";

import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";

import UserServer from "../components/serverList/UserServers";
import Explore from "../components/primaryDraw/Explore";

const Home = () => {
  return (
    <>
      <Nav />
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
        <Main />
      </Box>
    </>
  );
};

export default Home;
