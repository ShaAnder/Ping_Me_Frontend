import React, { useState, useMemo, useEffect, useCallback } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import createMuiTheme from "../theme/Theme";
import { ColorModeContext } from "./DarkModeContext";

interface ToggleColorModeProps {
  children: React.ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<"light" | "dark">(() => {
    const storedMode = localStorage.getItem("colorMode");
    if (storedMode === "light" || storedMode === "dark") {
      return storedMode;
    }
    return prefersDarkMode ? "dark" : "light";
  });

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);
  const theme = useMemo(() => createMuiTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
