const OtherDetails = ({ data, setData }) => {
  const handleOtherDetailsChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      otherDetails: {
        ...prev.otherDetails,
        [name]: value,
      },
    }));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("file", file);
    setData((prev) => ({
      ...prev,
      otherDetails: {
        ...prev.otherDetails,
        document: file,
      },
    }));
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150";

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PAN
        </label>
        <input
          type="text"
          name="pan"
          value={data.otherDetails.pan}
          onChange={handleOtherDetailsChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GST NO.
        </label>
        <input
          type="text"
          name="gstNo"
          value={data.otherDetails.gstNo}
          onChange={handleOtherDetailsChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <select
          name="currency"
          value={data?.otherDetails.currency || ""}
          onChange={handleOtherDetailsChange}
          className={inputClass}
        >
          <option value="">Select a currency</option>
          <option value="₹">₹</option>
          <option value="$">$</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Term
        </label>
        <select
          name="paymentTerm"
          value={data?.otherDetails.paymentTerm || ""}
          onChange={handleOtherDetailsChange}
          className={inputClass}
        >
          <option value="">Payment Term</option>
          <option value="Due on Receipt">Due on Receipt</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Document
        </label>
        {data?.otherDetails.document &&
          typeof data?.otherDetails.document === "string" && (
            <div className="mb-2 text-sm">
              <a
                href={`${data?.otherDetails.document}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Current Document
              </a>
            </div>
          )}
        <input
          type="file"
          name="document"
          onChange={handleDocumentChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
    </div>
  );
};

export default OtherDetails;
