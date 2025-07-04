import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import VendorForm from "../../../components/form/VendorForm";
import { useGet } from "../../../hooks/useGet";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDelete } from "../../../hooks/useDelete";
import { baseUrl } from "../../../utills/enum";
import { useCallback } from "react";
import { debounce } from "lodash";
import { usePatchFile } from "../../../hooks/usePatchFile";

import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";
import { Users, UserCheck, UserX } from "lucide-react";

const Vendors = () => {
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  // const [showActions, setShowActions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorStatusFilter, setVendorStatusFilter] = useState("all");

  // const { deleteData } = useDelete();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem("itemsPerPage");
    return saved ? Number(saved) : 10;
  });
  const statusParam =
    vendorStatusFilter === "active"
      ? "true"
      : vendorStatusFilter === "inactive"
      ? "false"
      : "";

  const { data, loading, refetch } = useGet(
    `/vendors?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&status=${statusParam}`
  );

  const vendors = data?.data || [];
  const counts = data?.counts || { all: 0, active: 0, inactive: 0 };

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage);
  }, [itemsPerPage]);

  // const handleDelete = async (ids) => {
  //   const toDelete = Array.isArray(ids) ? ids : [ids];

  //   if (toDelete.length === 0) {
  //     toast.error("Please select at least one vendor to delete.");
  //     return;
  //   }

  //   const confirm = window.confirm(
  //     `Are you sure you want to delete ${
  //       toDelete.length > 1 ? `${toDelete.length} vendors` : "this vendor"
  //     }?`
  //   );
  //   if (!confirm) return;

  //   try {
  //     await Promise.all(
  //       toDelete.map((vendorId) => deleteData(`${baseUrl}/vendors/${vendorId}`))
  //     );

  //     toast.success(
  //       `Vendor${toDelete.length > 1 ? "s" : ""} deleted successfully`
  //     );

  //     setSelectedVendors((prev) => prev.filter((id) => !toDelete.includes(id)));
  //     refetch();
  //   } catch (err) {
  //     toast.error("Failed to delete vendor(s)");
  //     console.error(err);
  //   }
  // };

  const handleCloseForm = () => {
    setShowVendorForm(false);
    refetch();
  };

  const handleCheckboxChange = (vendorId) => {
    setSelectedVendors((prevSelected) =>
      prevSelected.includes(vendorId)
        ? prevSelected.filter((id) => id !== vendorId)
        : [...prevSelected, vendorId]
    );
  };

  const handleSelectAll = () => {
    const currentPageVendorIds = vendors.map((vendor) => vendor._id);

    if (currentPageVendorIds.every((id) => selectedVendors.includes(id))) {
      setSelectedVendors((prevSelected) =>
        prevSelected.filter((id) => !currentPageVendorIds.includes(id))
      );
    } else {
      setSelectedVendors((prevSelected) => [
        ...new Set([...prevSelected, ...currentPageVendorIds]),
      ]);
    }
  };

  // debounce search method
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 500),
    []
  );
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const currentPageVendorIds = vendors.map((vendor) => vendor._id);
  const allSelectedOnPage = currentPageVendorIds.every((id) =>
    selectedVendors.includes(id)
  );

  // handle status
  const { patchData } = usePatchFile();

  const handleStatusUpdate = async (e) => {
    const value = e.target.value;

    if (["all", "active", "inactive"].includes(value)) {
      setVendorStatusFilter(value);
      setCurrentPage(1);
      return;
    }

    if (value === "mark-active" || value === "mark-inactive") {
      const statusBool = value === "mark-active";
      if (selectedVendors.length === 0) {
        toast.error("Please select at least one vendor");
        return;
      }

      try {
        await Promise.all(
          selectedVendors.map((id) =>
            patchData(`${baseUrl}/vendors/${id}/status`, {
              status: statusBool,
            })
          )
        );
        // toast.success(
        //   `Marked ${selectedVendors.length} vendor(s) as ${
        //     statusBool ? "active" : "inactive"
        //   }`
        // );
        setSelectedVendors([]);
        refetch();
      } catch (err) {
        console.error("Status update failed", err);
      }
    }
    setVendorStatusFilter("all");
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 mb-6">
        {/* All Vendors */}
        <div
          onClick={() => {
            setVendorStatusFilter("all");
            setCurrentPage(1);
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
            vendorStatusFilter === "all"
              ? "bg-blue-100 border-blue-400 ring-2 ring-blue-300"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-sm bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
              All
            </span>
          </div>
          <h4 className="text-base font-semibold text-gray-700 mb-1">
            All Vendors
          </h4>
          <p className="text-3xl font-bold text-gray-900">{counts?.all ?? 0}</p>
        </div>

        {/* Active Vendors */}
        <div
          onClick={() => {
            setVendorStatusFilter("active");
            setCurrentPage(1);
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
            vendorStatusFilter === "active"
              ? "bg-green-100 border-green-400 ring-2 ring-green-300"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <UserCheck className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-sm bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <h4 className="text-base font-semibold text-green-700 mb-1">
            Active Vendors
          </h4>
          <p className="text-3xl font-bold text-gray-900">
            {counts?.active ?? 0}
          </p>
        </div>

        {/* Inactive Vendors */}
        <div
          onClick={() => {
            setVendorStatusFilter("inactive");
            setCurrentPage(1);
          }}
          className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
            vendorStatusFilter === "inactive"
              ? "bg-red-100 border-red-400 ring-2 ring-red-300"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <UserX className="h-6 w-6 text-red-600 mr-2" />
            <span className="text-sm bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
              Inactive
            </span>
          </div>
          <h4 className="text-base font-semibold text-red-700 mb-1">
            Inactive Vendors
          </h4>
          <p className="text-3xl font-bold text-gray-900">
            {counts?.inactive ?? 0}
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white rounded-xl my-6 mx-4">
        <div className="w-full flex justify-center items-center m-4">
          <select
            value={vendorStatusFilter}
            onChange={handleStatusUpdate}
            className="w-1/6 text-sm border border-gray-300 rounded px-3 py-2 mr-10"
          >
            <option value="all">All Vendors</option>
            <option value="active">Active Vendors</option>
            <option value="inactive">Inactive Vendors</option>
            <option disabled>──────────</option>
            <option value="mark-active">Mark Selected as Active</option>
            <option value="mark-inactive">Mark Selected as Inactive</option>
          </select>

          <div className="w-4/6 rounded">
            <input
              type="text"
              placeholder="Search vendors..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
            />
          </div>
          <div className="flex justify-center items-center w-1/6">
            <button
              onClick={() => setShowVendorForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex gap-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>
        </div>
        {showVendorForm && <VendorForm onClose={handleCloseForm} />}
      </div>

      <div className="overflow-x-auto my-10 bg-white rounded-b-xl shadow-md mx-4 mt-0">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="flex items-center gap-2">
            <label htmlFor="perPage" className="text-sm text-gray-700">
              Items per page:
            </label>
            <select
              id="perPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on change
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <table className="min-w-full table-fixed text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase sticky top-0 z-1">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelectedOnPage}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Payable</th>
              <th className="px-4 py-3">Unused Credits</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-600">
                  Loading vendors...
                </td>
              </tr>
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-600">
                  No vendor yet.
                </td>
              </tr>
            ) : (
              vendors?.map((vendor) => (
                <tr
                  key={vendor._id}
                  className={`border-t transition ${
                    vendor.status === false
                      ? "bg-red-100 text-gray-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedVendors.includes(vendor._id)}
                      onChange={() => handleCheckboxChange(vendor._id)}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td className="px-4 py-2">{vendor.companyName}</td>
                  <td className="px-4 py-2 text-blue-600 underline">
                    {vendor.companyEmail || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {vendor.vendorMobileNumber ||
                      vendor.vendorPhoneNumber ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 1000)}
                  </td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 700)}
                  </td>
                  <td className="px-4 py-2 text-center space-x-4 ">
                    <Link to={`/vendors/${vendor._id}`}>
                      <button className="ml-2 text-blue-500 hover:text-blue-700 text-sm">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                    </Link>
                    {/* <button
                      onClick={() => handleDelete(vendor._id)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil((data?.total || 0) / itemsPerPage)}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(Math.ceil((data?.total || 0) / itemsPerPage))].map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil((data?.total || 0) / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil((data?.total || 0) / itemsPerPage)
              }
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;
