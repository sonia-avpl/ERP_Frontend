import { Plus } from "lucide-react";
import NewItemForm from "../../../components/form/NewItemForm";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useGet } from "../../../hooks/useGet";
import { HiOutlineEye } from "react-icons/hi2";
import LoadinSpinner from "../../../components/common/LoadinSpinner";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Items = () => {
  const [showItemForm, setShowItemForm] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    data: res,
    loading,
    refetch,
  } = useGet(`/inventory?page=${page}&limit=${limit}&search=${debouncedSearchTerm}`);

  const itemData = res?.data || [];
  const totalPages = res?.totalPages || 1;

  const debouncedSearch = useCallback(
    debounce((value) => setDebouncedSearchTerm(value), 500),
    []
  );
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleCheckboxChange = (itemsId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemsId)
        ? prevSelected.filter((id) => id !== itemsId)
        : [...prevSelected, itemsId]
    );
  };

  const handleSelectAll = () => {
    const currentPageVendorIds = itemData.map((item) => item._id);

    if (currentPageVendorIds.every((id) => selectedItems.includes(id))) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => !currentPageVendorIds.includes(id))
      );
    } else {
      setSelectedItems((prevSelected) => [
        ...new Set([...prevSelected, ...currentPageVendorIds]),
      ]);
    }
  };

  const currentPageVendorIds = itemData.map((item) => item._id);
  const allSelectedOnPage = currentPageVendorIds.every((id) =>
    selectedItems.includes(id)
  );

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if(value === "archive") {
      if(selectedItems.length === 0){
        toast.error("Please select at least one item to archive.")
      }
    }
    
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white rounded-xl my-6 mx-4">
        <div className="w-1/6 text-sm border-gray-300 rounded px-3 py-2 mr-10">
          <select
            onChange={handleSelectChange}
            className="text-sm border border-gray-300 rounded px-3 py-2 mr-10"
          >
            <option value="all">All Items</option>
            <option value="archive">Add to archive</option>
          </select>
        </div>

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
            onClick={() => setShowItemForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>
      {showItemForm && <NewItemForm onClose={() => setShowItemForm(false)} />}
      <div className="overflow-x-auto my-6 bg-white rounded-xl shadow-md mx-4">
        <table className="min-w-full table-fixed text-sm text-left border border-gray-200 rounded-lg overflow-hidden ">
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
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Selling Price</th>
              <th className="px-4 py-3">Cost Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-600">
                  <LoadinSpinner />
                </td>
              </tr>
            ) : itemData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-600">
                  No items yet.
                </td>
              </tr>
            ) : (
              itemData?.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item.sku}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item?.createdBy?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item?.salesInformation?.sellingPrice || "N/A"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {item?.purchaseInformation?.purchasePrice || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center space-x-4">
                    <Link to={`/inventory/${item._id}`}>
                      <button className="ml-2 text-blue-500 hover:text-blue-700 text-sm">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-end px-4 py-3 bg-white rounded-b-xl shadow md:px-6">
            {/* Previous */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="inline-flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1.5 rounded text-sm border
              ${
                pageNum === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50"
              }
            `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Items;
