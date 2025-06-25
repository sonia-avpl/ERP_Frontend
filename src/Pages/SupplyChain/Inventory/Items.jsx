import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        console.log("Fetched items:", response.data);
        setSavedItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold">All Items</div>
        <button
          onClick={() => navigate("/inventory/items/new")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>

      {/* Table or empty state */}
      <div className="overflow-x-auto mt-8 mx-4">
        {savedItems.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No items saved yet.
          </div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm font-medium text-gray-500">
              <tr>
                <th className="px-3 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-2">NAME</th>
                <th className="px-3 py-2">SKU</th>
                <th className="px-3 py-2">TYPE</th>
                <th className="px-3 py-2">DESCRIPTION</th>
                <th className="px-3 py-2 text-right">RATE</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {savedItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-2 flex items-center gap-2">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt="Item Thumbnail"
                        className="w-6 h-6 object-cover rounded border"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                        🖼️
                      </div>
                    )}
                    <span className="text-indigo-600 hover:underline whitespace-nowrap">
                      {item.name || "Untitled Item"}
                    </span>
                  </td>
                  <td className="px-3 py-2">{item.sku}</td>
                  <td className="px-3 py-2">{item.type}</td>
                  <td className="px-3 py-2 truncate max-w-xs">
                    {item.salesDescription || item.purchaseDescription || "—"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {item.sellingPrice
                      ? `₹${parseFloat(item.sellingPrice).toFixed(2)}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Items;