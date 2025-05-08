import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Popular from "./pages/Popular";
import ToggleColorMode from "./contexts/ToggleColorMode";
import Server from "./pages/Server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Popular />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <>
      <ToggleColorMode>
        <RouterProvider router={router} />
      </ToggleColorMode>
    </>
  );
};

export default App;
