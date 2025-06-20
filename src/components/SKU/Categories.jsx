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
  // Add more items as needed
];

const Categories = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-sm">
      <h2 className="text-xl font-semibold mb-6">🕒 Pending SKU Requests</h2>

      {pendingSKUs.map((sku, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow flex flex-col md:flex-row overflow-hidden mb-6"
        >
          {/* Left: Image Placeholder */}
          <div className="bg-gray-100 p-6 flex justify-center items-center w-full md:w-1/3">
            <div className="w-40 h-40 border rounded bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{sku.code}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                {sku.status}
              </span>
            </div>

            <p className="text-gray-700 font-medium mb-4">{sku.name}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold">{sku.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Sub-Category</p>
                <p className="font-semibold">{sku.subCategory}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Unit of Measure</p>
                <p className="font-semibold">{sku.uom}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">HSN Code</p>
                <p className="font-semibold">{sku.hsn}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Reorder Level</p>
                <p className="font-semibold">{sku.reorderLevel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Safety Stock</p>
                <p className="font-semibold">{sku.safetyStock}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Stock</p>
                <p className="font-semibold">{sku.currentStock}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Audit</p>
                <p className="font-semibold">{sku.lastAudit}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="flex items-center gap-1 border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
                ✏️ Edit Details
              </button>
              <button className="flex items-center gap-1 border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
                🔁 View History
              </button>
              <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                🖨️ Print Label
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
