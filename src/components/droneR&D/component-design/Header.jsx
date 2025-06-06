import { ArrowDownTrayIcon, DevicePhoneMobileIcon, DeviceTabletIcon, PrinterIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <div className="module-header flex justify-between items-start flex-wrap gap-4 bg-white p-4 rounded shadow">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Quadcopter Flight Controller v4.2</h2>
        <p className="text-sm text-gray-500">Main control board for Eagle Drone Series</p>
      </div>
      <div className="module-actions flex flex-wrap gap-2">
        <button className="btn flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
          <DeviceTabletIcon className="w-5 h-5" />
          Save Design
        </button>
        <button className="btn flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
          <SquaresPlusIcon className="w-5 h-5" />
          New Version
        </button>
        <button className="btn flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300">
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export
        </button>
        <button className="btn flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300">
          <PrinterIcon className="w-5 h-5" />
          Print Specs
        </button>
      </div>
    </div>
  );
};

export default Header;
