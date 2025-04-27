import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Main = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          mt: `${theme.nav.height}px`,
          ml: `calc(${theme.serverList.width}px + ${theme.primaryDraw.width}px)`,
          height: `calc(100vh - ${theme.nav.height}px)`,
          overflow: "hidden",
        }}
      >
        {[...Array(50)].map((_, i) => (
          <Typography key={i} paragraph>
            {i + 1}
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default Main;
