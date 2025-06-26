import AdminDashboard from "./AdminDashboard";
import DroneDashboard from "./DroneR&DSystem/DroneDashboard";
import SupplyChain from "./DroneR&DSystem/SupplyChain/SupplyChain";
import HrDashboard from "./HrSystem/HrDashboard";
import PrincipalDashboard from "./Lms/PrincipalDashboard";

const Dashboard = () => {

  const userRole = JSON.parse(localStorage.getItem("user"));
  console.log(userRole.role)
  return (
    <div>
      {userRole.role === "Admin" && <AdminDashboard />}
      {userRole.role === "R&D Manager" && <DroneDashboard />}
      {userRole.role === "HR" && <HrDashboard />}
      {userRole.role === "Principal" && <PrincipalDashboard />}
      {userRole.role === "Supply Chain" && <SupplyChain />}
    </div>
  );
};

export default Dashboard;
