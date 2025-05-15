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
  const { serverId, channelId } = useParams();

  const { dataCRUD, error, loading, fetchData } = useCrud<ServerInterface>(
    [],
    `api/server_list/select/?by_serverid=${serverId}`
  );

  // Check if the channelId is valid by searching for it in the data fetched from the API
  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    }

    return dataCRUD.some((server) =>
      server.channel_server.some(
        (channel) => channel.id === parseInt(channelId)
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);

  if (error !== null && error.message === "400") {
    navigate("/");
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
          <ServerChannel data={dataCRUD} />
        </PrimaryDraw>

        {/* Drawer - Popular Servers */}
        <Main>
          <MessageInterface data={dataCRUD} />
        </Main>
      </Box>
    </>
  );
};

export default Server;
