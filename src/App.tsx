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
import EditProfile from "./pages/EditProfile";
import Login from "./pages/userAuthPages/Login";
import Signup from "./pages/userAuthPages/Signup";
import ForgotPassword from "./pages/userAuthPages/Forget";
import ResetPassword from "./pages/userAuthPages/Reset";
import { UserAuthProvider } from "./services/providers/UserAuthProvider";
import { ServerProvider } from "./services/providers/ServerProvider";
import { UserServerProvider } from "./services/providers/UserServerProvider";

// import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:uid/:token" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile/edit/" element={<EditProfile />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Popular />} />
    </>
  )
);

const App: React.FC = () => {
  return (
    <>
      <UserAuthProvider>
        <ServerProvider>
          <UserServerProvider>
            <ToggleColorMode>
              <RouterProvider router={router} />
            </ToggleColorMode>
          </UserServerProvider>
        </ServerProvider>
      </UserAuthProvider>
    </>
  );
};

export default App;
