const GrnInputForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Goods Received Note (GRN)
        </h2>

        {/* Form fields go here */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">GRN Number</label>
            <input type="text" className="border p-2 rounded w-full" placeholder="Auto-generated or enter manually" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Receipt</label>
            <input type="date" className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Purchase Order Number</label>
            <input type="text" className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Supplier Details</label>
            <textarea className="border p-2 rounded w-full" placeholder="Name, address, contact"></textarea>
          </div>

          {/* Item details - can expand this dynamically if needed */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Item Details</label>
            <textarea className="border p-2 rounded w-full" placeholder="Item code, description, quantity, price..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Received By</label>
            <input type="text" className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Checked By</label>
            <input type="text" className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea className="border p-2 rounded w-full"></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
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