import {
  ArrowsRightLeftIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const InventoryOverview = ({
  data,
  loading,
  error,
  page,
  setPage,
  filters,
  setFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const inventoryStats = [
    {
      label: "Total Inventory Items",
      value: data?.pagination?.total || 0,
      trend: "up",
      trendText: "+3%",
    },
    {
      label: "Low Stock Items",
      value: data?.data?.filter((item) => item.stockLevel === "low").length || 0,
      trend: "down",
      trendText: "-1%",
    },
    {
      label: "Critical Stock Items",
      value:
        data?.data?.filter((item) => item.stockLevel === "critical").length || 0,
      trend: "down",
      trendText: "-2%",
    },
  ];

  const totalPages = data?.pagination?.pages || 1;

  // Handler for filters input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="bg-white rounded shadow p-6 flex-[2]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Inventory Overview</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          <FunnelIcon className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search by SKU, Name, Description"
            value={filters.search}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full text-sm"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full text-sm"
          >
            <option value="">All Categories</option>
            {/* Replace these with your dynamic categories if available */}
            {["Drone Frame", "Battery", "Flight Controller", "Propeller", "Landing Gear", "GPS Module"].map((el)=>(
               <option value={el}>{el}</option>
            ))}
            
          </select>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full text-sm"
          >
            <option value="">All Locations</option>
            {["Gurgaon", "Bihar", "Others"].map((el)=>(
               <option value={el}>{el}</option>
            ))}
          </select>
          <select
            name="stockLevel"
            value={filters.stockLevel}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full text-sm"
          >
            <option value="">All Stock Levels</option>
               {['high', 'medium', 'low', 'critical'].map((el)=>(
               <option value={el}>{el}</option>
            ))}
          </select>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {inventoryStats.map((stat, index) => {
          const TrendIcon =
            stat.trend === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
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

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-6">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">Error loading inventory.</div>
        ) : (
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
                  <th
                    key={idx}
                    className="px-4 py-2 font-medium text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{item.sku}</td>
                  <td className="px-4 py-2 text-gray-800">{item.itemName}</td>
                  <td className="px-4 py-2 text-gray-800">
                    {item.category?.name || item.category}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {item.location?.name || item.location}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{item.currentStock}</td>
                  <td className="px-4 py-2 text-gray-800">{item.minStock}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded font-medium text-white ${
                        item.stockLevel === "high"
                          ? "bg-green-600"
                          : item.stockLevel === "medium"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {item.stockLevel === "high"
                        ? "In Stock"
                        : item.stockLevel === "medium"
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
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 text-sm font-medium text-gray-700">{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryOverview;
