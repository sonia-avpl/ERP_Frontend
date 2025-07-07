import { useGet } from "../hooks/useGet";
import AdminDashboard from "./AdminDashboard";
import DroneDashboard from "./DroneR&DSystem/DroneDashboard";
import SupplyChain from "./DroneR&DSystem/SupplyChain/SupplyChain";
import HrDashboard from "./HrSystem/HrDashboard";
import PrincipalDashboard from "./Lms/PrincipalDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data } = useGet(`auth/role/${user?.role}`);

  const userRole = data.roleName;

  return (
    <div>
      {userRole === "Admin" && <AdminDashboard />}
      {userRole === "R&D Manager" && <DroneDashboard />}
      {userRole === "HR" && <HrDashboard />}
      {userRole === "Principal" && <PrincipalDashboard />}
      {userRole === "Supply Chain" && <SupplyChain />}
    </div>
  );
};

export default Dashboard;
