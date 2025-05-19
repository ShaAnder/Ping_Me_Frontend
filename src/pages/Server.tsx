import { useEffect, useMemo } from "react";
import { Box, Typography, CardMedia, CircularProgress } from "@mui/material";

import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";
import UserServer from "../components/serverList/UserServers";
import MessageInterface from "../components/main/MessageInterface";
import ServerChannel from "../components/primaryDraw/ServerChannels";
import UserPanel from "../components/shared/UserPanel";
import { useServerContext } from "../hooks/useServerContext";
import { useParams, useNavigate } from "react-router-dom";
import LeaveServerButton from "../components/shared/LeaveServerButton";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const {
    servers,
    loading: loadingServers,
    refreshServers,
  } = useServerContext();

  const currentServer = useMemo(() => {
    if (!Array.isArray(servers) || servers.length === 0) return null;
    return servers.find((s) => String(s.id) === String(serverId)) || null;
  }, [servers, serverId]);

  useEffect(() => {
    if (
      !loadingServers &&
      currentServer &&
      channelId &&
      !currentServer.channel_server.some(
        (channel) => String(channel.id) === String(channelId)
      )
    ) {
      navigate(`/server/${serverId}`);
    }
  }, [loadingServers, currentServer, channelId, navigate, serverId]);

  if (loadingServers || servers === null) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentServer) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Server not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Nav
        rightAction={<LeaveServerButton serverId={currentServer.id} />}
        serverName={currentServer.name}
      />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Sidebar - User's Servers */}
        <ServerList>
          <UserServer />
        </ServerList>

        {/* Primary Drawer - Server Info and Channels */}
        <PrimaryDraw>
          <Box sx={{ mb: 0, textAlign: "center" }}>
            <CardMedia
              component="img"
              image={currentServer.server_image_urls?.banner_image_url}
              alt={currentServer.name}
              sx={{
                width: "100%",
                height: 137,
                objectFit: "cover",
              }}
            />
          </Box>

          <ServerChannel
            server={currentServer}
            onChannelRefresh={refreshServers}
            onServerDeleted={refreshServers} // Pass refreshServers here!
          />
        </PrimaryDraw>

        {/* Main Content - Messages + Leave Button */}
        <Main>
          <MessageInterface
            server={currentServer}
            onChannelRefresh={refreshServers}
          />
        </Main>

        <UserPanel />
      </Box>
    </>
  );
};

export default Server;
