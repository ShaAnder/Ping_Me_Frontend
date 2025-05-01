import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Divider,
} from "@mui/material";
import useCrud from "../../hooks/useFetchCRUDData";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

interface Server {
  id: number;
  name: string;
  category: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
}

import home from "../../assets/img/home.png";
import plus from "../../assets/img/plus.png";

const UserServer: React.FC = () => {
  const { dataCRUD, error, loading, fetchData } = useCrud<Server>(
    [],
    "/server_list/select/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <List>
      {/* Static: Home */}
      <ListItem disablePadding sx={{ display: "block" }} dense>
        <ListItemButton
          component={Link}
          to="/"
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
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "#36393f",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#5865F2",
                },
              }}
            >
              <Avatar
                alt="Home"
                src={home}
                sx={{
                  width: 40,
                  height: 40,
                  filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                }}
              />
            </Box>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      {/* Static: Add Server */}
      <ListItem disablePadding sx={{ display: "block" }} dense>
        <ListItemButton
          component={Link}
          to="/create-or-join"
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
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "	#36393f",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#5865F2",
                },
              }}
            >
              <Avatar
                alt="Add Server"
                src={plus}
                sx={{
                  width: 32,
                  height: 32,
                  filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                }}
              />
            </Box>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <Divider sx={{ my: 1 }} />
      {dataCRUD.map((item) => (
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
              sx={{
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto", // removes default 56px spacing
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt="Server Icon"
                  src={`${item.server_image_urls.server_icon_url}`}
                  sx={{ width: 48, height: 48, borderRadius: 3 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default UserServer;
