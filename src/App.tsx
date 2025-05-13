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
import Signup from "./pages/Login";
import { AuthServiceProvider } from "./contexts/UserAuthContext";

import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Popular />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/testlogin"
        element={
          <ProtectedRoute>
            <TestLogin />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <>
      <AuthServiceProvider>
        <ToggleColorMode>
          <RouterProvider router={router} />
        </ToggleColorMode>
      </AuthServiceProvider>
    </>
  );
};

export default App;
