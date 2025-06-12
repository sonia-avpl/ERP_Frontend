import { NavigateButton } from '../buttons/NavigateButton';
import { BuildingOfficeIcon, CubeIcon, PlusIcon } from '@heroicons/react/24/outline';

const RecentOrder = () => {
 const orders = [
    {
      id: "ORD-001",
      supplier: "Acme Corp",
      items: "Steel Rods",
      quantity: 500,
      status: "Processing",
      date: "2025-06-08",
      value: "$45,000",
    },
    {
      id: "ORD-002",
      supplier: "TechSupply Inc",
      items: "Sensors",
      quantity: 200,
      status: "Shipped",
      date: "2025-06-10",
      value: "$28,500",
    },
    {
      id: "ORD-003",
      supplier: "PackPro Ltd",
      items: "Boxes",
      quantity: 1000,
      status: "Delivered",
      date: "2025-06-11",
      value: "$12,300",
    },
    {
      id: "ORD-004",
      supplier: "MetalWorks",
      items: "Aluminum Sheets",
      quantity: 300,
      status: "Pending",
      date: "2025-06-12",
      value: "$67,800",
    },
  ];
  const getOrderStatus = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{order.id}</h4>
                  <p className="text-sm text-gray-600">{order.supplier}</p>
                  <p className="text-sm text-gray-500">{order.items}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatus(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{order.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Quick Actions
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-6 space-y-4">
              <NavigateButton
                path="/supply-chain-dashboard/supplier"
                icon={BuildingOfficeIcon}
                label="View Supplier"
                color="purple"
              />
              <NavigateButton
                path="/inventory"
                icon={CubeIcon}
                label="View Inventories"
                color="green"
              />
              <NavigateButton
                path="/supply-chain-dashboard/documents"
                icon={PlusIcon}
                label="View Documents"
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default RecentOrder