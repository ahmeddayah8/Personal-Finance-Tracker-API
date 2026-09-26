import { Navigate } from "react-router";
import useAuthStore from "@/lib/store/authStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;