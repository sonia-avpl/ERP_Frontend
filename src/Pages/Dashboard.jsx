import AdminDashboard from "./AdminDashboard";
import DroneDashboard from "./DroneR&DSystem/DroneDashboard";
import HrDashboard from "./HrSystem/HrDashboard";
import PrincipalDashboard from "./Lms/PrincipalDashboard";

const Dashboard = () => {
  const userRole = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {userRole.role === "Admin" && <AdminDashboard />}
      {userRole.role === "R&D Manager" && <DroneDashboard />}
      {userRole.role === "HR" && <HrDashboard />}
      {userRole.role === "Principal" && <PrincipalDashboard />}
    </div>
  );
};

export default Dashboard;
