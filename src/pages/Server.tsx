import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

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

  const isMobile = useMediaQuery("(max-width:767px)", { noSsr: true });
  const [mainOpen, setMainOpen] = useState(false);

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

  // Pass this to ServerChannel or PrimaryDraw to open Main on click
  const handleOpenMain = () => setMainOpen(true);
  const handleCloseMain = () => setMainOpen(false);

  return (
    <>
      <Nav
        rightAction={
          <LeaveServerButton serverId={currentServer.id} showText={!isMobile} />
        }
        serverName={currentServer.name}
      />
      <Box sx={{ display: "flex", width: "100%" }}>
        <ServerList>
          <UserServer />
        </ServerList>

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
                display: isMobile ? "none" : "block",
              }}
            />
          </Box>

          <ServerChannel
            server={currentServer}
            onChannelRefresh={refreshServers}
            onServerDeleted={refreshServers}
            onOpenMain={handleOpenMain}
            isMobile={isMobile}
          />
        </PrimaryDraw>

        <Main
          open={!isMobile || mainOpen}
          onClose={isMobile ? handleCloseMain : undefined}
        >
          <MessageInterface
            server={currentServer}
            onChannelRefresh={refreshServers}
            isMobile={isMobile} // Pass isMobile here!
          />
        </Main>

        <UserPanel />
      </Box>
    </>
  );
};

export default Server;
