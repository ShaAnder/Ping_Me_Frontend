import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
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

const Server: React.FC = () => {
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    "/server_list/select/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <List>
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
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Server;
