import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SupplierCreateModal from "../../../components/modals/supplyChain/SupplierCreateModal";
import { useGet } from "../../../hooks/useGet";
import { baseUrl } from "../../../utilis";

const Supplier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryParams, setQueryParams] = useState("page=1&limit=6");

  const { data, loading, error, refetch } = useGet(
    `${baseUrl}/supplier?${queryParams}`
  );

  const suppliers = data?.suppliers || [];
  const page = Number(new URLSearchParams(queryParams).get("page")) || 1;
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setQueryParams(`page=1&limit=6&search=${search}`);
  };

  const handleTypeFilterChange = (e) => {
    const type = e.target.value;
    setQueryParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      searchParams.set("page", 1);
      searchParams.set("supplierType", type);
      return searchParams.toString();
    });
  };

  const handlePrevPage = () => {
    setQueryParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      const currentPage = Number(searchParams.get("page")) || 1;
      searchParams.set("page", Math.max(1, currentPage - 1));
      return searchParams.toString();
    });
  };

  const handleNextPage = () => {
    setQueryParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      const currentPage = Number(searchParams.get("page")) || 1;
      searchParams.set("page", currentPage + 1);
      return searchParams.toString();
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Supplier Management
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Supplier
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Search & Filter */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            onChange={handleSearchChange}
            className="border p-2 rounded w-full md:w-64"
          />

          <select
            onChange={handleTypeFilterChange}
            className="border p-2 rounded w-full md:w-64"
          >
            <option value="">All Types</option>
            <option value="Vendor">Vendor</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Service Provider">Service Provider</option>
            <option value="Wholesaler">Wholesaler</option>
          </select>
        </div>

        {/* Supplier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse border rounded-lg p-6 space-y-4"
                  >
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
            : suppliers.map((supplier) => (
                <div
                  key={supplier._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">
                      {supplier.supplierName}
                    </h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {supplier.supplierApprovalStatus || "Active"}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {supplier.supplierLocation || "N/A"}
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      {supplier.supplierPhone || "N/A"}
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      {supplier.supplierEmail || "N/A"}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <SupplierCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetch(); // 🔄 Refresh after modal close
        }}
      />
    </div>
  );
};

export default Supplier;
