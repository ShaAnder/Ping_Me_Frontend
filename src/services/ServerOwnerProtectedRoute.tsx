import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";
import { useServerContext } from "../hooks/useServerContext";
import { Box, CircularProgress } from "@mui/material";
import ErrorPage from "../pages/ErrorPage";

interface ServerOwnerProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ServerOwnerProtectedRoute ensures the user is authenticated and 
 * is the owner of the server before allowing access to the page.
 */
const ServerOwnerProtectedRoute = ({ children }: ServerOwnerProtectedRouteProps) => {
  const { serverId } = useParams();
  const { user, isAuthenticated, loading: userLoading } = useUserAuth();
  const { servers, loading: serversLoading } = useServerContext();

  // If user data is still loading, show loading spinner
  if (userLoading || serversLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Find the server
  const server = servers?.find(s => String(s.id) === String(serverId));

  // If server not found or user is not the owner
  if (!server) {
    return <ErrorPage error={{ status: 404, message: "Server not found" }} />;
  }

  // Check if the current user is the owner
  if (server.owner_id !== user.id) {
    return <ErrorPage error={{ status: 403, message: "You don't have permission to edit this server" }} />;
  }

  return <>{children}</>;
};

export default ServerOwnerProtectedRoute;
