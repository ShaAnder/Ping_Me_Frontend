import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import CreateServerButton from "./AddServerButton";
import HomeButton from "./HomeButton";
import { useUserServers } from "../../hooks/useUserServers";

const UserServer: React.FC = () => {
  const { servers, loading } = useUserServers();
  const location = useLocation();

  const selectedServerId = location.pathname.startsWith("/server/")
    ? parseInt(location.pathname.split("/server/")[1])
    : null;

  return (
    <List>
      <HomeButton />
      <CreateServerButton />
      <Divider sx={{ my: 1 }} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress size={32} />
        </Box>
      ) : servers.length > 0 ? (
        servers.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/server/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={selectedServerId === item.id}
                sx={{
                  minHeight: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt={item.name}
                    src={item.server_image_urls?.server_icon_url}
                    sx={{ width: 48, height: 48, borderRadius: 3 }}
                  />
                </ListItemIcon>
              </ListItemButton>
            </Link>
          </ListItem>
        ))
      ) : (
        <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}></Box>
      )}
    </List>
  );
};

export default UserServer;
