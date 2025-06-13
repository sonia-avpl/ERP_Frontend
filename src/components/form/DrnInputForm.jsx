const DrnInputForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-8 text-center text-red-600">
          Add DRN
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DRN Number */}
          <div>
            <label className="block text-sm font-medium mb-1">DRN Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* GRN Number (optional) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              GRN Number (if applicable)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Purchase Order Number */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Purchase Order Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Supplier Details */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Supplier Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Supplier Name"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Supplier Address"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Item Details Table */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Item Details
            </label>
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Item Code</th>
                    <th className="p-2 border text-left">Description</th>
                    <th className="p-2 border text-left">Qty Received</th>
                    <th className="p-2 border text-left">Qty Damaged</th>
                    <th className="p-2 border text-left">Cause of Damage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full border rounded p-1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile stacked view */}
            <div className="md:hidden space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <input
                  type="text"
                  placeholder="Item Code"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full border rounded p-2"
                />
                <input
                  type="number"
                  placeholder="Qty Received"
                  className="w-full border rounded p-2"
                />
                <input
                  type="number"
                  placeholder="Qty Damaged"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Nature of Damage"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </div>

          {/* Reported By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">
              Reported By
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Signature / Initials"
                className="border rounded p-2"
              />
            </div>
          </div>

          {/* Verified By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">
              Verified By
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Signature / Initials"
                className="border rounded p-2"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
            >
              Submit DRN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrnInputForm;
