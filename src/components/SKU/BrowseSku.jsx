const statuses = {
  active: "bg-green-100 text-green-700",
  low: "bg-red-100 text-red-700",
  expiring: "bg-red-100 text-red-700",
};

const skus = [
  {
    code: "SKU-EL-1001",
    name: "Wireless Mouse",
    category: "Electronics",
    stock: "124 units",
    reorder: "50 units",
    status: "active",
    statusText: "Active",
  },
  {
    code: "SKU-OF-2056",
    name: "Ergonomic Chair",
    category: "Office Furniture",
    stock: "32 units",
    reorder: "20 units",
    status: "active",
    statusText: "Active",
  },
  {
    code: "SKU-CS-3045",
    name: "Printer Ink Cartridge",
    category: "Consumables",
    stock: "18 units",
    reorder: "25 units",
    status: "low",
    statusText: "Low Stock",
  },
  {
    code: "SKU-ST-4098",
    name: "A4 Paper Pack (500 sheets)",
    category: "Stationery",
    stock: "56 units",
    reorder: "30 units",
    status: "active",
    statusText: "Active",
  },
  {
    code: "SKU-CS-5112",
    name: "Hand Sanitizer (500ml)",
    category: "Consumables",
    stock: "12 units",
    reorder: "15 units",
    status: "expiring",
    statusText: "Expiring in 45 days",
  },
];

const BrowseSku = () => {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">All SKUs in Inventory</h3>

      <div className="flex justify-end mb-3 space-x-2">
        <button className="border px-4 py-1 rounded-md text-sm">
          🔍 Filters
        </button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
          📄 Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">SKU Code</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Current Stock</th>
              <th className="p-2">Reorder Level</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 1 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-2">{sku.code}</td>
                <td className="p-2">{sku.name}</td>
                <td className="p-2">{sku.category}</td>
                <td className="p-2">{sku.stock}</td>
                <td className="p-2">{sku.reorder}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md font-medium ${
                      statuses[sku.status]
                    }`}
                  >
                    {sku.statusText}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button title="View">👁️</button>
                  <button title="Edit">✏️</button>
                  <button title="History">🔄</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseSku;
