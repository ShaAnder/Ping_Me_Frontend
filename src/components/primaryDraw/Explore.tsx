import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  ListItemIcon,
  Typography,
  capitalize,
} from "@mui/material";
import useCrud from "../../hooks/useFetchCRUDData";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";

interface Category {
  id: number;
  name: string;
  description: string;
  category_icon_url: string;
}

const Explore = () => {
  const theme = useTheme();
  const { dataCRUD, error, loading, fetchData } = useCrud<Category>(
    [],
    "/categories/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 4,
          fontSize: 16,
          letterSpacing: 1,
          fontFamily: "verdana",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          mb: 1,
        }}
      >
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {dataCRUD.map((item) => (
          <ListItem
            disablePadding
            key={item.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explort/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48, fontFamily: "verdana" }}>
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <ListItemAvatar
                    sx={{ minWidth: 0, alignItems: "center", display: "flex" }}
                  >
                    <img
                      alt="category icon"
                      src={item.category_icon_url}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: "8px",
                        objectFit: "cover",
                        opacity: 0.8,
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Explore;
