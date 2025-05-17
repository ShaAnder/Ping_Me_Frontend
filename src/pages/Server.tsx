import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Nav from "./templates/Nav";
import ServerList from "./templates/ServerList";
import PrimaryDraw from "./templates/PrimaryDraw";
import Main from "./templates/Main";
import UserServer from "../components/serverList/UserServers";
import MessageInterface from "../components/main/MessageInterface";
import ServerChannel from "../components/primaryDraw/ServerChannels";
import UserPanel from "../components/shared/UserPanel";
import { useServerContext } from "../hooks/useServerContext";
import { useUserServers } from "../hooks/useUserServers";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/config";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const { servers, loadingServers } = useServerContext();
  const { refresh: refreshUserServers } = useUserServers();
  const [leaving, setLeaving] = useState(false);

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

  const handleLeaveServer = async () => {
    if (!currentServer) return;
    setLeaving(true);
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `${BASE_URL}/api/servers/${currentServer.id}/remove_member/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUserServers(); // Refresh sidebar
      navigate("/"); // Go to homepage after leaving
    } catch (err) {
      console.log(err);
      setLeaving(false);
    }
  };

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
      <Nav />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Sidebar - User's Servers */}
        <ServerList>
          <UserServer />
        </ServerList>

        {/* Primary Drawer - Server Info and Channels */}
        <PrimaryDraw>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{ mb: 0, textAlign: "center", flex: 1, overflowY: "auto" }}
            >
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
              <ServerChannel server={currentServer} />
            </Box>

            {/* Bottom: Leave Server Button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 2,
                bgcolor: "background.paper",
              }}
            >
              <Tooltip title="Leave Server">
                <IconButton
                  onClick={handleLeaveServer}
                  disabled={leaving}
                  sx={{
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "transparent" },
                    color: "error.main",
                  }}
                  aria-label="Leave Server"
                >
                  <Typography>Leave Server</Typography>
                  <ExitToAppIcon sx={{ pl: 1 }} fontSize="medium" />
                </IconButton>
              </Tooltip>
              <Box sx={{ height: "15vh" }}></Box>
            </Box>
          </Box>
        </PrimaryDraw>

        {/* Main Content - Messages + Leave Button */}
        <Main>
          <MessageInterface server={currentServer} />
        </Main>
      </Box>

      <UserPanel />
    </>
  );
};

export default Server;
