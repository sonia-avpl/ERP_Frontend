import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  // const {user}=useAuth()
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
