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
import SupplyChain from "../Pages/DroneR&DSystem/SupplyChain/SupplyChain";
import ProjectManagement from "../Pages/ProjectManagmentSystem/ProjectManagement";
import Documents from "../Pages/DroneR&DSystem/SupplyChain/Documents";
import Overview from "../Pages/DroneR&DSystem/SupplyChain/Overview";
import Supllier from "../Pages/DroneR&DSystem/SupplyChain/Supllier";
import UserManagement from "../Pages/UserManagement/UserManagement";
import Setting from "../Pages/Settings/Setting";
import Reporting from "../Pages/Reporting/Reporting";
import QualityControl from "../Pages/QualityControl/QualityControl";
import ReportingSupplyChain from "../Pages/Reporting/ReportingSupplyChain";
import SkuManagement from "../Pages/SupplyChain/SkuManagement";
import Procurement from "../Pages/SupplyChain/Procurement";
import GRNProcessing from "../Pages/SupplyChain/GRNProcessing";

// Inventory pages
import Items from "../Pages/SupplyChain/Inventory/Items";
import ItemGroups from "../Pages/SupplyChain/Inventory/ItemGroups";
import InventoryAdjustment from "../Pages/SupplyChain/Inventory/InventoryAdjustment";

// Sales pages
import Customers from "../Pages/SupplyChain/Sales/Customers";
import SalesOrder from "../Pages/SupplyChain/Sales/SalesOrder";
import Packages from "../Pages/SupplyChain/Sales/Packages";
import Shipments from "../Pages/SupplyChain/Sales/Shipments";
import DeliveryChallans from "../Pages/SupplyChain/Sales/DeliveryChallans";
import Invoices from "../Pages/SupplyChain/Sales/Invoices";
import PaymentReceived from "../Pages/SupplyChain/Sales/PaymentReceived";
import SalesReturn from "../Pages/SupplyChain/Sales/SalesReturn";
import CreditNotes from "../Pages/SupplyChain/Sales/CreditNotes";

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
          <Route path="/project-managment" element={<ProjectManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="sku-management" element={<SkuManagement />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="grn-processing" element={<GRNProcessing />} />
          <Route path="/settings" element={<Setting />} />

          {/* Inventory Routes */}
          <Route path="/inventory/items" element={<Items />} />
          <Route path="/inventory/item-groups" element={<ItemGroups />} />
          <Route
            path="/inventory/adjustments"
            element={<InventoryAdjustment />}
          />

          {/* Sales Routes */}
          <Route path="/sales/customers" element={<Customers />} />
          <Route path="/sales/orders" element={<SalesOrder />} />
          <Route path="/sales/packages" element={<Packages />} />
          <Route path="/sales/shipments" element={<Shipments />} />
          <Route
            path="/sales/delivery-challans"
            element={<DeliveryChallans />}
          />
          <Route path="/sales/invoices" element={<Invoices />} />
          <Route
            path="/sales/payments-received"
            element={<PaymentReceived />}
          />
          <Route path="/sales/returns" element={<SalesReturn />} />
          <Route path="/sales/credit-notes" element={<CreditNotes />} />

          <Route path="/quality-control" element={<QualityControl />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route
            path="/reporting-supply-chain"
            element={<ReportingSupplyChain />}
          />

          <Route path="/supply-chain-dashboard" element={<SupplyChain />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="documents" element={<Documents />} />
            <Route path="supplier" element={<Supllier />} />
          </Route>
          <Route path="/testing-validation" element={<TestingValidation />} />
          <Route path="/compliance-docs" element={<ComplianceDocs />} />
          <Route
            path="/prototype-management"
            element={<PrototypeManagement />}
          />
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
