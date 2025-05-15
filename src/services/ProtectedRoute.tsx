import { Navigate } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
