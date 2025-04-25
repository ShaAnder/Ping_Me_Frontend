import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Nav = () => {
  const theme = useTheme();
  return (
    <AppBar>
      <Toolbar variant="dense" sx={{ height: theme.nav.height }}>
        <h3>Home</h3>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
