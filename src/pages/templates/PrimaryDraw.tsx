import { Box, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type PrimaryDrawProps = {
  children: ReactNode;
};

const PrimaryDraw = ({ children }: PrimaryDrawProps) => {
  const theme = useTheme();
  // This is the primary draw template, will cover the drawing of either categories
  // or the channels in server view

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
          {children}
        </Box>
      </Drawer>
    </>
  );
};
export default PrimaryDraw;
