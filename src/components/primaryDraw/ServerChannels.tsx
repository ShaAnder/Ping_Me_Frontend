import {
  List,
  ListItem,
  ListItemButton,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ServerInterface } from "../../@types/server";

export interface ServerChannelProps {
  server: ServerInterface | null;
}

const ServerChannel = ({ server }: ServerChannelProps) => {
  const theme = useTheme();
  const { serverId } = useParams();

  if (!server) {
    return (
      <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="body2">No server selected.</Typography>
      </Box>
    );
  }

  // Defensive: if channel_server is missing or not an array
  if (
    !Array.isArray(server.channel_server) ||
    server.channel_server.length === 0
  ) {
    return (
      <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="body2">
          No channels found for this server.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          fontSize: 16,
          letterSpacing: 1,
          fontFamily: "verdana",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          mb: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
        }}
      >
        {server.name.length > 20
          ? `${server.name.slice(0, 20)}...`
          : server.name}
      </Box>
      <List sx={{ py: 0 }}>
        {server.channel_server.map((channel) => (
          <ListItem
            disablePadding
            key={channel.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/server/${serverId}/${channel.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48, fontFamily: "verdana" }}>
                {channel.type === "text" ? (
                  <>#️ {channel.name}</>
                ) : (
                  <>🔊 {channel.name}</>
                )}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ServerChannel;
