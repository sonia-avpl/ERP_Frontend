const UploadDocuments = ({ onClose }) => {
  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="bg-white  max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
          Upload Documents
        </h2>

        {/* Form */}
        <form className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <input type="file" name="documents" />

            {/* Submit Button */}
            <button
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-md font-semibold transition duration-200 ease-in-out focus:outline-none"
              type="submit"
            >
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadDocuments;
