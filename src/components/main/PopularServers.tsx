import { ListItemText, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useFetchCRUDData";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface PopularServer {
  id: number;
  name: string;
  category_name: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
}

const ExplorePopularServers = () => {
  const { categoryName } = useParams();
  const url = categoryName
    ? `api/server_list/select/?category=${categoryName}`
    : "api/server_list/select/";
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
            <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
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
                  <Box sx={{ position: "relative", width: "300px", mt: 5 }}>
                    <CardMedia
                      component="img"
                      image={item.server_image_urls.banner_image_url}
                      alt="server banner image"
                      sx={{
                        display: { xs: "none", sm: "block" },
                        width: "95%",
                        borderRadius: 2,
                        border: "2px solid gray",
                      }}
                    />

                    <CardMedia
                      component="img"
                      image={item.server_image_urls.server_icon_url}
                      alt="server icon"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        width: "40px",
                        height: "40px",
                        borderRadius: 2,

                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        backgroundColor: "white",
                        border: "2px solid white",
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
                  ></ListItemText>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ExplorePopularServers;
