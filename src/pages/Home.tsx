import { Box } from "@mui/material";

import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";

const Home = () => {
  return (
    <>
      <Nav />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Sidebar - Server List */}
        <ServerList />

        {/* Explore Section - Primary Drawer */}
        <PrimaryDraw />

        {/* Drawer - Popular Servers */}
        <Main />
      </Box>
    </>
  );
};

export default Home;
