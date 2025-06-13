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

        <h2 className="text-3xl font-semibold mb-8 text-center">Add GRN</h2>

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
            <label className="block text-sm font-medium mb-1">
              Item Details
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Item code, description, quantity, price..."
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Received By
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Checked By</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
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
