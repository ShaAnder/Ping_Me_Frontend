import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    nav: {
      height: number;
    };
  }
  interface ThemeOptions {
    nav?: {
      height?: number;
    };
  }
}

export const createMuiTheme = () => {
  const theme = createTheme({
    nav: {
      height: 50,
    },
  });
  return theme;
};

export default createMuiTheme;
