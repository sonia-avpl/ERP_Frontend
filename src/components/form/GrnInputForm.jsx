const GrnInputForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Add Goods Received Note (GRN)
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* GRN Number & Date */}
          <div>
            <label className="block font-medium mb-1">GRN Number</label>
            <input
              type="text"
              placeholder="Auto-generated or enter manually"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Receipt</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* PO Number */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Purchase Order Number
            </label>
            <input
              type="text"
              placeholder="PO number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Supplier Info */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Supplier Details</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Supplier Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Supplier Address"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Item Details</label>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100 text-sm text-gray-700">
                  <tr>
                    {[
                      "Item Code",
                      "Description",
                      "Qty Ordered",
                      "Qty Received",
                      "Unit Price",
                      "Total Amount",
                    ].map((th, i) => (
                      <th key={i} className="text-left p-3 border">
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <td key={i} className="p-2 border">
                          <input
                            type={i >= 2 ? "number" : "text"}
                            step={i >= 4 ? "0.01" : undefined}
                            readOnly={i === "number"}
                            className={`w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-400 ${
                              i === 5 ? "bg-gray-100" : ""
                            }`}
                          />
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 mt-4">
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <input
                  type="text"
                  placeholder="Item Code"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Qty Ordered"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="number"
                    placeholder="Qty Received"
                    className="border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Unit Price"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Total"
                    readOnly
                    className="border border-gray-300 rounded p-2 bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Received By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">
              Received By
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Receiver's Name"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Signature</label>
                <input
                  type="text"
                  placeholder="Signature / Initials"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Checked By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">
              Checked By
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Checker's Name"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Signature</label>
                <input
                  type="text"
                  placeholder="Signature / Initials"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              rows={2}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg"
            >
              Submit GRN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrnInputForm;
