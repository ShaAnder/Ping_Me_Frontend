import { Box, AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Nav = () => {
  const theme = useTheme();
  const pageTitle = "PingMe Home";
  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.nav.height,
          minHeight: theme.nav.height,
          position: "relative", // so the centered text can be absolute
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Empty box to reserve space on the left */}
        <Box sx={{ width: 120 }} />

        {/* Centered title */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
          }}
        >
          {pageTitle} {/* This can come from props/state */}
        </Box>

        {/* Right-side actions */}
        <Box sx={{ display: "flex", gap: 1 }}></Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
