import { Box, Drawer } from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

type Props = {
  children: ReactNode;
};

const ServerList: React.FC<Props> = ({ children }) => {
  // server list always visible, we populate the users servers on here
  const theme = useTheme();

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
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default ServerList;
