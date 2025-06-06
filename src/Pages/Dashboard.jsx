import DroneDashboard from "./DroneR&DSystem/DroneDashboard";
import HrDashboard from "./HrSystem/HrDashboard";


const Dashboard = () => {
  const userRole = "R&D"; // Replace with dynamic value like from context or localStorage

  return (
    <div>
      {userRole === "R&D" && <DroneDashboard />}
      {userRole === "HR" && <HrDashboard />}
    </div>
  );
};

export default Dashboard;
