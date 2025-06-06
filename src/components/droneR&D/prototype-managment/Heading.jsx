import {
  PlusIcon,
  CodeBracketSquareIcon,
  BeakerIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const Heading = () => {
  return (
    <div className="module-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Eagle Surveillance Drone - Prototype v4.2</h2>
        <p className="text-sm text-gray-600">Long-range surveillance drone with thermal imaging capabilities</p>
      </div>

      <div className="module-actions flex flex-wrap gap-2">
        <button className="bg-blue-600 text-white flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-blue-700">
          <PlusIcon className="w-4 h-4" /> New Prototype
        </button>

        <button className="bg-green-600 text-white flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-green-700">
          <CodeBracketSquareIcon className="w-4 h-4" /> New Version
        </button>

        <button className="bg-yellow-500 text-white flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-yellow-600">
          <BeakerIcon className="w-4 h-4" /> Start Test
        </button>

        <button className="bg-gray-600 text-white flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-gray-700">
          <ArrowDownTrayIcon className="w-4 h-4" /> Export Report
        </button>
      </div>
    </div>
  );
};

export default Heading;
