import {
  ArrowUpTrayIcon,       // for import
  PencilSquareIcon,       // for signature/submit
  ArrowPathIcon,          // for sync/check updates
} from "@heroicons/react/24/solid";

const Heading = () => {
  return (
    <div className="module-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Eagle Surveillance Drone - DGCA Type Certification
        </h2>
        <p className="text-sm text-gray-600">
          Documentation for regulatory approval and airworthiness certification
        </p>
      </div>

      <div className="module-actions flex flex-wrap gap-2">
        <button className="bg-blue-600 text-white flex items-center gap-2 text-sm px-3 py-1.5 rounded hover:bg-blue-700">
          <ArrowUpTrayIcon className="w-4 h-4" /> Import Documents
        </button>

        <button className="bg-green-600 text-white flex items-center gap-2 text-sm px-3 py-1.5 rounded hover:bg-green-700">
          <PencilSquareIcon className="w-4 h-4" /> Submit for Approval
        </button>

        <button className="bg-gray-600 text-white flex items-center gap-2 text-sm px-3 py-1.5 rounded hover:bg-gray-700">
          <ArrowPathIcon className="w-4 h-4" /> Check Updates
        </button>
      </div>
    </div>
  );
};

export default Heading;
