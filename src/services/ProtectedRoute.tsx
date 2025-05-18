import { Navigate } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useUserAuth();

  // Wait until loading is false before deciding
  if (loading) {
    // You can return a spinner or null
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
