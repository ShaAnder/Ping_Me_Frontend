import {
  ListItemText,
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useServerContext } from "../../hooks/useServerContext";

const ExplorePopularServers: React.FC = () => {
  const { categoryName } = useParams();
  const { servers, loadingServers, refreshServers } = useServerContext();

  useEffect(() => {
    refreshServers(categoryName);
    // eslint-disable-next-line
  }, [categoryName]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 4 }}>
        <Typography
          variant="h3"
          noWrap
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: "-2px",
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
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "-2px",
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {loadingServers ? (
          <Typography sx={{ px: 2, py: 4 }}>
            loadingServers servers...
          </Typography>
        ) : servers.length === 0 ? (
          <Typography sx={{ px: 2, py: 4 }}>No servers found.</Typography>
        ) : (
          servers.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  backgroundImage: "none",
                }}
              >
                <Link
                  to={`/server/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box sx={{ position: "relative", width: "100%", mt: 5 }}>
                    <CardMedia
                      component="img"
                      image={item.server_image_urls.banner_image_url}
                      alt="server banner image"
                      sx={{
                        width: "95%",
                        borderRadius: 2,
                        border: "2px solid gray",
                        margin: "0 auto",
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                    <CardMedia
                      component="img"
                      image={item.server_image_urls.server_icon_url}
                      alt="server icon"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        backgroundColor: "white",
                        border: "2px solid white",
                        display: { xs: "none", sm: "flex" },
                      }}
                    />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        textAlign="start"
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          fontSize: 20,
                          fontFamily: "verdana",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 15,
                          fontFamily: "verdana",
                          fontWeight: 500,
                          opacity: 1,
                          letterSpacing: 1,
                        }}
                      >
                        {item.category_name.charAt(0).toUpperCase() +
                          item.category_name.slice(1)}
                      </Typography>
                    }
                  />
                </Link>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ExplorePopularServers;
