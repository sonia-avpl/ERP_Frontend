import React from "react";

const pendingSKUs = [
  {
    code: "SKU-EL-1001",
    name: "Wireless Mouse - Premium Edition",
    category: "Electronics",
    subCategory: "Computer Accessories",
    uom: "Unit",
    hsn: "84716090",
    reorderLevel: "50 units",
    safetyStock: "20 units",
    currentStock: "124 units",
    lastAudit: "2023-10-15",
    status: "Active",
  },
  {
    code: "SKU-OF-2056",
    name: "Ergonomic Chair",
    category: "Office Furniture",
    subCategory: "Chairs",
    uom: "Unit",
    hsn: "94033090",
    reorderLevel: "20 units",
    safetyStock: "10 units",
    currentStock: "18 units",
    lastAudit: "2023-10-20",
    status: "Low Stock",
  },
  {
    code: "SKU-CS-5112",
    name: "Hand Sanitizer (500ml)",
    category: "Consumables",
    subCategory: "Hygiene",
    uom: "Unit",
    hsn: "38089400",
    reorderLevel: "15 units",
    safetyStock: "5 units",
    currentStock: "12 units",
    lastAudit: "2023-11-01",
    status: "Expiring in 45 days",
  },
  {
    code: "SKU-ST-4098",
    name: "A4 Paper Pack (500 sheets)",
    category: "Stationery",
    subCategory: "Paper Products",
    uom: "Unit",
    hsn: "48025690",
    reorderLevel: "30 units",
    safetyStock: "10 units",
    currentStock: "56 units",
    lastAudit: "2023-11-10",
    status: "Active",
  },
];

const getStatusBadge = (status) => {
  let color = "bg-green-100 text-green-700";
  if (status.toLowerCase().includes("low")) color = "bg-red-100 text-red-700";
  else if (status.toLowerCase().includes("expiring")) color = "bg-yellow-100 text-yellow-800";

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
      {status}
    </span>
  );
};

const PendingRequests = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">🕒 Pending SKU Requests</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3">SKU Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Sub-Category</th>
              <th className="px-4 py-3">Current Stock</th>
              <th className="px-4 py-3">Reorder Level</th>
              <th className="px-4 py-3">HSN Code</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingSKUs.map((sku, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{sku.code}</td>
                <td className="px-4 py-3">{sku.name}</td>
                <td className="px-4 py-3">{sku.category}</td>
                <td className="px-4 py-3">{sku.subCategory}</td>
                <td className="px-4 py-3">{sku.currentStock}</td>
                <td className="px-4 py-3">{sku.reorderLevel}</td>
                <td className="px-4 py-3">{sku.hsn}</td>
                <td className="px-4 py-3">{getStatusBadge(sku.status)}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="text-blue-600 hover:underline text-xs">
                      ✏️ Edit
                    </button>
              <button className="flex items-center gap-1 border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
                🔁 View History
                    </button>
                    <button className="text-indigo-600 hover:underline text-xs">
                      🖨️ Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
