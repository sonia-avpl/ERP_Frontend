const GetCertificates = ({ onClose }) => {
  const certificates = [
    "Remote Pilot Certificate (RPC)",
    "Remote Pilot Training Organization (RPTO) Approval",
    "Type Certification for Drones",
    "Unique Identification Number (UIN) for Drones",
    "Permission for Commercial Operations (NPNT Compliance)",
  ];
  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Document Process
        </h2>

        {/* Form */}
        <form className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              {certificates.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center text-base font-medium cursor-pointer hover:text-blue-600 transition"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 mr-3 transition"
                  />
                  {item}
                </label>
              ))}
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition duration-200 ease-in-out focus:outline-none"
              type="submit"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetCertificates;
