import { Box, Typography, Drawer } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const ServerList = () => {
  // server list always visible, we populate the users servers on here
  const theme = useTheme();
  const [selectedServer, setSelectedServer] = useState<number | null>(null);

  return (
    <>
      <Drawer
        variant="permanent"
        hideBackdrop
        slotProps={{
          paper: {
            sx: {
              mt: `${theme.nav.height}px`,
              boxShadow: "none",
              height: `calc(100vh - ${theme.nav.height})px`,
              width: theme.serverList.width,
              border: "1px solid lightgrey",
            },
          },
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none", // IE/Edge
            scrollbarWidth: "none", // Firefox
          }}
        >
          {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default ServerList;
