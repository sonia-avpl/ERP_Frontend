import { Routes, Route, Navigate } from "react-router-dom";
import ProjectDetail from "../Pages/ProjectDetail";
import List from "../Pages/ProjectManagmentSystem/teamSpace/List";
import Table from "../Pages/ProjectManagmentSystem/teamSpace/Table";
import Dashboard from "../Pages/Dashboard";
import BoardPage from "../Pages/ProjectManagmentSystem/teamSpace/BoardPage";
import RoleProtectedRoute from "./protectedRoute/RoleProtectedRoute";
import Inventory from "../Pages/DroneR&DSystem/Inventory";
import TestingValidation from "../Pages/DroneR&DSystem/TestingValidation";
import ComplianceDocs from "../Pages/DroneR&DSystem/ComplianceDocs";
import PrototypeManagement from "../Pages/DroneR&DSystem/PrototypeManagement";
import ComponentDesign from "../Pages/DroneR&DSystem/ComponentDesign";


const AllRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole ="R&D";

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/testing-validation" element={<TestingValidation />} />
      <Route path="/compliance-docs" element={<ComplianceDocs />} />
      <Route path="/prototype-management" element={<PrototypeManagement />} />
      <Route path="/component-design" element={<ComponentDesign />} />

      <Route
        path="/projects/:projectId"
        element={
          <RoleProtectedRoute allowedRoles={["R&D"]} userRole={userRole}>
            <ProjectDetail />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<Navigate to="board" replace />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="list" element={<List />} />
        <Route path="table" element={<Table />} />
      </Route>

    </Routes>
  );
};

export default AllRoutes;
