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
    ? `/server_list/select/?category=${categoryName}`
    : "/server_list/select/";
  const { dataCRUD, fetchData } = useCrud<PopularServer>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 4 }}>
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
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="h2"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "40",
                letterSpace: "-2",
              },
              textAlign: { xs: "center", sm: "left" },
              opacity: 0.6,
            }}
          >
            {categoryName
              ? `Talking about all things ${
                  categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                }`
              : "Here's all of the most popular servers!"}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {dataCRUD.map((item) => (
            <Grid
              item // Boolean prop (no value needed)
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              {/* Your content here */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ExplorePopularServers;
