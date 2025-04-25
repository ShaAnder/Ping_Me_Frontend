import { Box, CssBaseline } from "@mui/material";

import Nav from "./templates/Nav";

function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Nav />
    </Box>
  );
}

export default Home;
