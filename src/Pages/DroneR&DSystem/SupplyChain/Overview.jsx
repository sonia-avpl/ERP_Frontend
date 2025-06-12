import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  CubeIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import RecentOrder from "../../../components/supplyChain/RecentOrder";



const Overview = () => {
  const stats = [
    {
      label: "Total Inventory Value",
      value: "$2.4M",
      icon: CubeIcon,
      change: "+12%",
      trend: "up",
      color: "text-blue-600",
    },
    {
      label: "Active Orders",
      value: "156",
      icon: ClipboardDocumentListIcon,
      change: "+8%",
      trend: "up",
      color: "text-green-600",
    },
    {
      label: "Suppliers",
      value: "42",
      icon: BuildingOfficeIcon,
      change: "+3",
      trend: "up",
      color: "text-purple-600",
    },
    {
      label: "In Transit",
      value: "23",
      icon: TruckIcon,
      change: "-2%",
      trend: "down",
      color: "text-orange-600",
    },
  ];

 
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon =
            stat.trend === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon
                      className={`w-4 h-4 mr-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

     <RecentOrder/>
      
    </div>
  );
};

export default Overview;
