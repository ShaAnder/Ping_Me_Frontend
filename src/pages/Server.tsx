import { Box } from "@mui/material";

import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";
import UserServer from "../components/serverList/UserServers";
import MessageInterface from "../components/main/MessageInterface";
import ServerChannel from "../components/primaryDraw/ServerChannels";
import { ServerInterface } from "../@types/server.d";
import useCrud from "../hooks/useFetchCRUDData";
import { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

const Server = () => {
  const navigate = useNavigate();
  const { serverId } = useParams();

  const { error, fetchData } = useCrud<ServerInterface>(
    [],
    `/server_list/select/?by_serverid=${serverId}`
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (error !== null && error.message === "400") {
    navigate("/");
    // can also use this to open a modal for user confirmation
    return null;
  }

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
          <ServerChannel />
        </PrimaryDraw>

        {/* Drawer - Popular Servers */}
        <Main>
          <MessageInterface />
        </Main>
      </Box>
    </>
  );
};

export default Server;
