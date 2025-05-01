import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    nav: {
      height: number;
    };
    serverList: {
      width: number;
    };
    primaryDraw: {
      width: number;
    };
  }
  interface ThemeOptions {
    nav?: {
      height?: number;
    };
    serverList: {
      width?: number;
    };
    primaryDraw: {
      width?: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: { fontWeight: 500, letterSpacing: "-0.5px" },
    },

    nav: {
      height: 50,
    },
    serverList: {
      width: 72,
    },
    primaryDraw: {
      width: 240,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createMuiTheme;
