import { Navigate } from "react-router-dom";
import { getAccessToken } from "../services/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return getAccessToken() ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
