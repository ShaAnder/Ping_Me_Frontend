import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Popular from "./pages/Popular";
import { ThemeProvider } from "@mui/material/styles";
import { createMuiTheme } from "./theme/Theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:categoryName" element={<Popular />} />
    </Route>
  )
);

const App: React.FC = () => {
  const theme = createMuiTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
