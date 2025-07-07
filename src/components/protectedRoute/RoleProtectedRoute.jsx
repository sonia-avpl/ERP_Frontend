import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user, roleName, loading } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (loading) return <div>Loading...</div>;

  if (roleName === "Admin") return <Outlet />;

  if (!allowedRoles.includes(roleName)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
