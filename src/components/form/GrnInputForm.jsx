const GrnInputForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-8 text-center text-green-600">Add GRN</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">GRN Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Auto-generated or enter manually"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Receipt
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Purchase Order Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="PO number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Supplier Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Supplier Name"
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Supplier Address"
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Contact Number"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Item Details
            </label>

            {/* For large screens: Table view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2 border">Item Code</th>
                    <th className="text-left p-2 border">Description</th>
                    <th className="text-left p-2 border">Qty Ordered</th>
                    <th className="text-left p-2 border">Qty Received</th>
                    <th className="text-left p-2 border">Unit Price</th>
                    <th className="text-left p-2 border">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded p-1"
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* For small screens: Stacked input rows */}
            <div className="md:hidden space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Item Code
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Qty Ordered
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Qty Received
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      readOnly
                      className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Received By Section */}
          <div className="md:col-span-2 border rounded-lg p-4 mb-4">
            <label className="block text-base font-semibold mb-3">
              Received By
            </label>
            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Receiver's Name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Signature</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Signature / Initials"
              />
            </div>
          </div>

          {/* Checked By Section */}
          <div className="md:col-span-2 border rounded-lg p-4 mb-4">
            <label className="block text-base font-semibold mb-3">
              Checked By
            </label>
            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Checker's Name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Signature</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Signature / Initials"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows={2}
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
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
