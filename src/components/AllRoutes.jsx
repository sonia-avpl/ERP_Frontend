import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import ProjectDetail from "../Pages/ProjectDetail";
import List from "../Pages/ProjectManagmentSystem/teamSpace/List";
import Table from "../Pages/ProjectManagmentSystem/teamSpace/Table";
import BoardPage from "../Pages/ProjectManagmentSystem/teamSpace/BoardPage";
import Inventory from "../Pages/DroneR&DSystem/Inventory";
import TestingValidation from "../Pages/DroneR&DSystem/TestingValidation";
import ComplianceDocs from "../Pages/DroneR&DSystem/ComplianceDocs";
import PrototypeManagement from "../Pages/DroneR&DSystem/PrototypeManagement";
import ComponentDesign from "../Pages/DroneR&DSystem/ComponentDesign";
import LoginPage from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/Register";
import VerifyEmail from "../Pages/Auth/VerifyEmail";
import VerifyResetOtp from "../Pages/Auth/VerifyResetOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import RoleProtectedRoute from "./protectedRoute/RoleProtectedRoute";
import Layout from "./layout/Layout";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes inside Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/testing-validation" element={<TestingValidation />} />
          <Route path="/compliance-docs" element={<ComplianceDocs />} />
          <Route path="/prototype-management" element={<PrototypeManagement />} />
          <Route path="/component-design" element={<ComponentDesign />} />
          
          <Route
            path="/projects/:projectId"
            element={
              // <RoleProtectedRoute allowedRoles={["R&D"]}>
                <ProjectDetail />
              // </RoleProtectedRoute>
            }
          >
            <Route index element={<Navigate to="board" replace />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="list" element={<List />} />
            <Route path="table" element={<Table />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
