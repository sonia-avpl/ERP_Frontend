import { Navigate, Outlet } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("user", user.role);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes("Admin")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
