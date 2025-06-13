const ErnInputForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-8 text-center text-yellow-600">Add ERN</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ERN Number */}
          <div>
            <label className="block text-sm font-medium mb-1">ERN Number</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-2" />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg p-2" />
          </div>

          {/* Item Details Table */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Item Details</label>
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Item Code</th>
                    <th className="p-2 border text-left">Description</th>
                    <th className="p-2 border text-left">Batch No.</th>
                    <th className="p-2 border text-left">Expiry Date</th>
                    <th className="p-2 border text-left">Stock</th>
                    <th className="p-2 border text-left">Qty to Dispose/Return</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border"><input type="text" className="w-full border rounded p-1" /></td>
                    <td className="p-2 border"><input type="text" className="w-full border rounded p-1" /></td>
                    <td className="p-2 border"><input type="text" className="w-full border rounded p-1" /></td>
                    <td className="p-2 border"><input type="date" className="w-full border rounded p-1" /></td>
                    <td className="p-2 border"><input type="number" className="w-full border rounded p-1" /></td>
                    <td className="p-2 border"><input type="number" className="w-full border rounded p-1" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile stacked view */}
            <div className="md:hidden space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <input type="text" placeholder="Item Code" className="w-full border rounded p-2" />
                <input type="text" placeholder="Description" className="w-full border rounded p-2" />
                <input type="text" placeholder="Batch No." className="w-full border rounded p-2" />
                <input type="date" placeholder="Expiry Date" className="w-full border rounded p-2" />
                <input type="number" placeholder="Current Stock" className="w-full border rounded p-2" />
                <input type="number" placeholder="Qty to Dispose/Return" className="w-full border rounded p-2" />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Reason</label>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input type="radio" name="reason" value="expired" className="mr-2" />
                Expired
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="reason" value="near-expiry" className="mr-2" />
                Near Expiry
              </label>
            </div>
          </div>

          {/* Raised By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">Raised By</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="border rounded p-2" />
              <input type="text" placeholder="Signature / Initials" className="border rounded p-2" />
            </div>
          </div>

          {/* Approved By */}
          <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
            <label className="block text-base font-semibold mb-4 text-gray-700">Approved By</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="border rounded p-2" />
              <input type="text" placeholder="Signature / Initials" className="border rounded p-2" />
            </div>
          </div>

          {/* Action Taken */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Action Taken</label>
            <input
              type="text"
              placeholder="e.g., Disposed, Returned to Supplier"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition-colors"
            >
              Submit ERN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ErnInputForm;
