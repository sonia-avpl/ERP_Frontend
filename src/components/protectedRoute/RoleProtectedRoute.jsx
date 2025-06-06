// components/RoleProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, userRole, children }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
