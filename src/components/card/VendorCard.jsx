import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const VendorCard = ({ vendor }) => {
  const initials = vendor.vendorName
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="w-full max-w-min bg-white rounded-xl shadow p-6 border border-gray-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{vendor.vendorName}</h4>
          <p className="text-sm text-gray-500">{vendor.vendorType}</p>
        </div>
      </div>

      <hr className="mb-4 border border-gray-300" />

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between px-2">
          <span className="text-gray-700">Contact:</span>
          <span className="font-medium">{vendor.vendorName}</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="text-gray-700">Email:</span>
          <span className="text-right text-blue-600 pl-4">{vendor.email}</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="text-gray-700">Phone:</span>
          <span>{vendor.phone}</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="text-gray-700">GSTIN:</span>
          <span>{vendor.gstin}</span>
        </div>
        {/* <div className="flex justify-between items-center">
          <span className="text-gray-500">Rating:</span>
          <span className="text-yellow-600">★★★★★ (4.2/5)</span>
        </div> */}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6 text-sm font-medium">
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">
          <EyeIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" /> View
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">
          <PencilSquareIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" /> Edit
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">
          📄 POs
        </button>
      </div>
    </div>
  );
};

export default VendorCard;
