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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserAuthProvider } from "./services/UserAuthProvider";

// import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Popular />} />
    </>
  )
);

const App: React.FC = () => {
  return (
    <>
      <UserAuthProvider>
        <ToggleColorMode>
          <RouterProvider router={router} />
        </ToggleColorMode>
      </UserAuthProvider>
    </>
  );
};

export default App;
