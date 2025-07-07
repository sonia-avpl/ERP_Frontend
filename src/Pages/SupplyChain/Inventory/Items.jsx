import { Plus } from "lucide-react";
import NewItemForm from "../../../components/form/NewItemForm";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useGet } from "../../../hooks/useGet";
import { HiOutlineEye } from "react-icons/hi2";
import LoadinSpinner from "../../../components/common/LoadinSpinner";

const Items = () => {
  const [showItemForm, setShowItemForm] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useGet(`/inventory?&search=${searchTerm}`);
  const itemData = data?.data || [];
  // debounce search method
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 500),
    []
  );
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white rounded-xl my-6 mx-4">
        <div className="w-1/6 text-sm border-gray-300 rounded px-3 py-2 mr-10">
          All Items
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
            ) : data?.data.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-600">
                  No items yet.
                </td>
              </tr>
            ) : (
              itemData?.map((item) => (
                <tr key={item._id}>
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
                    <button className="ml-2 text-blue-500 hover:text-blue-700 text-sm">
                      <HiOutlineEye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>      
      </div>
    </>
  );
};

export default Items;
