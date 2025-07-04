import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import VendorForm from "../../../components/form/VendorForm";
import { useGet } from "../../../hooks/useGet";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDelete } from "../../../hooks/useDelete";
import { baseUrl } from "../../../utills/enum";

import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";

const Vendors = () => {
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const { deleteData } = useDelete();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem("itemsPerPage");
    return saved ? Number(saved) : 10;
  });
  const { data, loading, refetch } = useGet(
    `/vendors?page=${currentPage}&limit=${itemsPerPage}`
  );

  const vendors = data?.data || [];

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage);
  }, [itemsPerPage]);

  const handleDelete = async (ids) => {
    const toDelete = Array.isArray(ids) ? ids : [ids];

    if (toDelete.length === 0) {
      toast.error("Please select at least one vendor to delete.");
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to delete ${
        toDelete.length > 1 ? `${toDelete.length} vendors` : "this vendor"
      }?`
    );
    if (!confirm) return;

    try {
      await Promise.all(
        toDelete.map((vendorId) => deleteData(`${baseUrl}/vendors/${vendorId}`))
      );

      toast.success(
        `Vendor${toDelete.length > 1 ? "s" : ""} deleted successfully`
      );

      setSelectedVendors((prev) => prev.filter((id) => !toDelete.includes(id)));
      refetch();
    } catch (err) {
      toast.error("Failed to delete vendor(s)");
      console.error(err);
    }
  };

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
    if (selectedVendors.length === data?.data?.length) {
      setSelectedVendors([]);
    } else {
      const allIds = data?.data?.map((vendor) => vendor._id) || [];
      setSelectedVendors(allIds);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white rounded-t-xl my-6 mx-4">
        <div className="text-lg font-semibold">Vendors</div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setShowVendorForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
          {selectedVendors.length > 0 && (
            <div className="relative">
              <button
                className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded flex items-center gap-1 text-sm"
                onClick={() => setShowActions((prev) => !prev)}
              >
                ⋮
              </button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-xl shadow-lg z-110 overflow-hidden">
                  <button
                    onClick={() => handleDelete(selectedVendors)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => {
                      alert("Mark as active");
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Mark as active
                  </button>
                  <button
                    onClick={() => {
                      alert("Mark as inactive");
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Mark as inactive
                  </button>
                </div>
              )}
            </div>
          )}
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
                  checked={
                    data?.data?.length > 0 &&
                    selectedVendors.length === data?.data?.length
                  }
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
                  className="border-t hover:bg-gray-100 transition"
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
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
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
