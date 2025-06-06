import {
  PlusIcon,
  PlayIcon,
  BugAntIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const TestModuleHeader = () => {
  return (
    <div className="module-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border-b border-gray-200">
      {/* Left: Title and description */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Eagle Surveillance Drone - Test Cycle 4.2
        </h2>
        <p className="text-gray-600">
          Validation testing for thermal imaging upgrade
        </p>
      </div>

      {/* Right: Action Buttons */}
      <div className="module-actions flex flex-wrap gap-2">
        <button className="btn bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded flex items-center gap-1">
          <PlusIcon className="w-4 h-4" />
          New
        </button>
        <button className="btn bg-green-600 text-white px-2 py-1 text-sm rounded flex items-center gap-1 hover:bg-green-700">
          <PlayIcon className="w-4 h-4" />
          Start
        </button>
        <button className="btn bg-yellow-500 text-white px-2 py-1 text-sm rounded flex items-center gap-1 hover:bg-yellow-600">
          <BugAntIcon className="w-4 h-4" />
          Defect
        </button>
        <button className="btn bg-gray-500 text-white px-2 py-1 text-sm rounded flex items-center gap-1 hover:bg-gray-600">
          <DocumentTextIcon className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
};

export default TestModuleHeader;
