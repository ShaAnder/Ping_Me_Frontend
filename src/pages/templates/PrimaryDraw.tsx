import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type PrimaryDrawProps = {
  children: ReactNode;
};

const PrimaryDraw = ({ children }: PrimaryDrawProps) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      hideBackdrop
      PaperProps={{
        sx: {
          mt: `${theme.nav.height}px`,
          marginLeft: `${theme.serverList.width}px`,
          boxShadow: "none",
          height: `calc(100vh - ${theme.nav.height}px )`,
          width: theme.primaryDraw.width,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {children}
    </Drawer>
  );
};
export default PrimaryDraw;
