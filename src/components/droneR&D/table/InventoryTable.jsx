import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CreateInventoryModal from "../../modals/inventory/CreateInventoryModal";

const InventoryTable = ({ loading, error, data,refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("Data",data)
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
                    <PencilSquareIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                    />
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
      />
    </div>
  );
};

export default InventoryTable;
