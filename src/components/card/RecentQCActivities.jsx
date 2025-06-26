const RecentQCActivities = ({
  grnNumber,
  status,
  vendor,
  invoiceValue,
  qcType,
  qcResult,
  processedBy,
}) => {
  const statusColorMap = {
    "Completed": "bg-green-200 text-green-700",
    "Discrepancy": "bg-red-200 text-red-600",
    "In Progress": "bg-violet-200 text-violet-600",
  };

  const statusColor = statusColorMap[status] || "bg-gray-100 text-gray-700";

  return (
    <div className="space bg-white rounded-xl shadow-md p-5 w-80 m-4 border border-gray-500 ">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{grnNumber}</h3>
        <span className={`text-sm px-3 py-1 rounded-full ml-4 ${statusColor}`}>
          {status}
        </span>
      </div>
      <hr className="mb-4" />
      <div className="flex flex-col justify-between space-y-2 text-sm font-medium text-gray-700">
        <p className="flex justify-between">
          Vendor: <span>{vendor}</span>
        </p>
        <p className="flex justify-between">
          Invoice Value: <span>₹{invoiceValue.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          QC Type: <span>{qcType}</span>
        </p>
        <p className="flex justify-between">
          QC Result: <span>{qcResult}</span>
        </p>
        <p className="flex justify-between">
          Processed By: <span>{processedBy}</span>
        </p>
      </div>
    </div>
  );
};

export default RecentQCActivities;
