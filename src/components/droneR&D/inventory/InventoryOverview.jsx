import { ArrowsRightLeftIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { inventoryData, inventoryStats } from "../../../data/inventory";


const InventoryOverview = () => {
  return (
    <div className="bg-white rounded shadow p-6 flex-[2]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Inventory Overview</h3>
        <button className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded">
          <FunnelIcon className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {inventoryStats.map((stat, index) => {
          const TrendIcon = stat.trend === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
          const trendColor = stat.trend === "up" ? "text-green-600" : "text-red-600";
          return (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                <span>{stat.trendText}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-t">
          <thead className="bg-gray-100 text-left">
            <tr>
              {[
                "SKU",
                "Item Name",
                "Category",
                "Location",
                "In Stock",
                "Min Stock",
                "Status",
                "Actions",
              ].map((col, idx) => (
                <th key={idx} className="px-4 py-2 font-medium text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {row.slice(0, 6).map((cell, i) => (
                  <td key={i} className="px-4 py-2 text-gray-800">
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded font-medium text-white ${
                      row[6] === "high"
                        ? "bg-green-600"
                        : row[6] === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    {row[6] === "high"
                      ? "In Stock"
                      : row[6] === "medium"
                      ? "Low Stock"
                      : "Critical"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="p-1 text-gray-600 hover:text-blue-600">
                    <PencilSquareIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-green-600">
                    <ArrowsRightLeftIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryOverview;
