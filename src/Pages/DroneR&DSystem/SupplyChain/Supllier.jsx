import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SupplierCreateModal from "../../../components/modals/supplyChain/SupplierCreateModal";
import { useGet } from "../../../hooks/useGet";
import { baseUrl } from "../../../utilis";
import CustomTable from "../../../components/droneR&D/table/CustomTable";


const Supplier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryParams, setQueryParams] = useState("page=1&limit=3");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error, refetch } = useGet(
    `${baseUrl}/supplier?${queryParams}`
  );

  const suppliers = data?.suppliers || [];
  const page = Number(new URLSearchParams(queryParams).get("page")) || 1;
  const totalPages = data?.totalPages || 1;
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        setQueryParams(`page=1&limit=3&search=${searchTerm}`);
      } else {
        setQueryParams(`page=1&limit=3`);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

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

  const columns = [
    { Header: "Name", accessor: "supplierName" },
    { Header: "Email", accessor: "supplierEmail" },
    { Header: "Phone", accessor: "supplierPhone" },
    { Header: "Type", accessor: "supplierType" },
    { Header: "Location", accessor: "supplierLocation" },
    { Header: "Status", accessor: "supplierApprovalStatus" },
  ];
const formattedSuppliers = suppliers.map((supplier) => ({
  ...supplier,
  bankName: supplier.supplierBankDetails?.bankName || "N/A",
}));

  const handleEdit = (supplier) => {
    console.log("Edit", supplier);
  };

  const handleDelete = (supplier) => {
    console.log("Delete", supplier);
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

        <div className="mt-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <CustomTable
              columns={columns}
              data={formattedSuppliers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

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
