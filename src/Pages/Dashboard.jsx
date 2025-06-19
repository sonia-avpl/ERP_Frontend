import DroneDashboard from "./DroneR&DSystem/DroneDashboard";
import SupplyChain from "./DroneR&DSystem/SupplyChain/SupplyChain";
import HrDashboard from "./HrSystem/HrDashboard";


const Dashboard = () => {
  const userRole = "SupplyChain"; // Replace with dynamic value like from context or localStorage

  return (
    <div>
      {userRole === "R&D" && <DroneDashboard />}
      {userRole === "HR" && <HrDashboard />}
      {userRole === "HR" && <SupplyChain />}
      
    </div>
  );
};

export default Dashboard;
