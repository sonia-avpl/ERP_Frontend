const DocumentProcess = ({ onClose }) => {
  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Document Process
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">STEP 1</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              name="step1"
              id="step1"
            >
              <option value="process">Certificate1 (pending) </option>
              <option value="process">2</option>
              <option value="process">process...</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">STEP 2</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              name="step2"
              id="step2"
            >
              <option value="process">Certificate1 (pending) </option>
              <option value="process">2</option>
              <option value="process">process...</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">STEP 3</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              name="step3"
              id="step3"
            >
              <option value="process">Certificate1 (pending) </option>
              <option value="process">2</option>
              <option value="process">process...</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">STEP 4</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              name="step4"
              id="step4"
            >
              <option value="process">Certificate1 (pending) </option>
              <option value="process">2</option>
              <option value="process">process...</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">STEP 5</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              name="step5"
              id="step5"
            >
              <option value="process">Certificate1 (pending) </option>
              <option value="process">2</option>
              <option value="process">process...</option>
            </select>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DocumentProcess;
