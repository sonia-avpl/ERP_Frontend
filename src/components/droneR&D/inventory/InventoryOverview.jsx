import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Pagination from "../../pagination/Pagination";
import InventoryTable from "../table/InventoryTable";


const InventoryOverview = ({
  data,
  loading,
  error,
  page,
  setPage,
  filters,
  setFilters,
  refetch,
  categories,
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
      value:
        data?.data?.filter((item) => item.stockLevel === "low").length || 0,
      trend: "down",
      trendText: "-1%",
    },
    {
      label: "Critical Stock Items",
      value:
        data?.data?.filter((item) => item.stockLevel === "critical").length ||
        0,
      trend: "down",
      trendText: "-2%",
    },
  ];

  const totalPages = data?.pagination?.pages || 1;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  return (
    <div className="bg-white rounded shadow p-6 flex-[2]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Inventory Overview
        </h3>
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
            {categories?.map((el) => (
              <option value={el.name}>{el.name}</option>
            ))}
          </select>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full text-sm"
          >
            <option value="">All Locations</option>
            {["Gurgaon", "Bihar", "Others"].map((el) => (
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
            {["high", "medium", "low", "critical"].map((el) => (
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
          const trendColor =
            stat.trend === "up" ? "text-green-600" : "text-red-600";
          return (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
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
      <InventoryTable
        data={data}
        loading={loading}
        error={error}
        refetch={refetch}
        categories={categories}
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default InventoryOverview;
