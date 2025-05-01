import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
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
        {children}
      </Box>
    </>
  );
};

export default Main;
