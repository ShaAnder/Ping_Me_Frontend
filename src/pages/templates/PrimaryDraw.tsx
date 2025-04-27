import { Box, Typography, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const PrimaryDraw = () => {
  const theme = useTheme();
  // This is the primary draw template, will cover the drawing of either categories
  // or the channels in server view
  const [open, setOpen] = useState(true);

  return (
    <>
      <Drawer
        variant="permanent"
        hideBackdrop
        slotProps={{
          paper: {
            sx: {
              mt: `${theme.nav.height}px`,
              marginLeft: `${theme.serverList.width}px`,
              boxShadow: "none",
              height: `calc(100vh - ${theme.nav.height})px`,
              width: theme.primaryDraw.width,
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
export default PrimaryDraw;
