import {
  PencilSquareIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import CreateInventoryModal from "../../modals/inventory/CreateInventoryModal";
import { usePatch } from "../../../hooks/usePatch";
import { baseUrl } from "../../../utills/enum";

const InventoryTable = ({ loading, error, data, refetch, categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { patchData } = usePatch();

  const handleStatusToggle = async (id) => {
    try {
      await patchData(`${baseUrl}/inventory/${id}/toggle-status`);
      refetch();
    } catch (error) {
      console.error("Status toggle failed", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center text-gray-500 py-6">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">
          Error loading inventory.
        </div>
      ) : (
        <table className="min-w-full text-sm border-t">
          <thead className="bg-gray-100 text-left">
            <tr>
              {[
                "SKU",
                "Item Name",
                "Category",
                "Location",
                "Current Stock",
                "Min Stock",
                "Stock Level",
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
            {data?.data?.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">
                  {item.category?.name || item.category}
                </td>
                <td className="px-4 py-2">
                  {item.location?.name || item.location}
                </td>
                <td className="px-4 py-2">{item.currentStock}</td>
                <td className="px-4 py-2">{item.minStock}</td>
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
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2 ">
                  <button className="p-1 text-gray-600 hover:text-blue-600">
                    <PencilSquareIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                    />
                  </button>
                  <button
                    className="p-1 text-gray-600 hover:text-red-600"
                    onClick={() => handleStatusToggle(item._id)}
                  >
                    <ArrowsRightLeftIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateInventoryModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        refetch={refetch}
        initialData={selectedItem}
        categories={categories}
      />
    </div>
  );
};

export default InventoryTable;
