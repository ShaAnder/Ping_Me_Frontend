import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useFetchCRUDData";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface PopularServer {
  id: number;
  name: string;
  category: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
}

const ExplorePopularServers = () => {
  const { categoryName } = useParams();
  const url = categoryName
    ? `/server/select/>category=${categoryName}`
    : "/server/select/";
  const { dataCRUD, fetchData } = useCrud<PopularServer>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6 }}>
          <Typography
            variant="h3"
            noWrap
            component="h1"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48",
                letterSpace: "-2",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName
              ? `Explore ${
                  categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                } Servers`
              : "All Popular Servers"}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ExplorePopularServers;
