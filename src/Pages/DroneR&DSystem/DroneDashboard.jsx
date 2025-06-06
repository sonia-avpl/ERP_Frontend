
import DashboardCards from '../../components/droneR&D/DashboardCards'
import RnDModules from '../../components/droneR&D/inventory/RnDModules'

const DroneDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">R&D Dashboard</h2>
      <DashboardCards />
      <RnDModules/>
    </div>
  )
}

export default DroneDashboard