import { handleDownload } from "../../utills/functions";

import handleDownloadFeeReceipt from "../pdf/handleDownloadFeeReceipt";

const DropDown = ({ dropdownOpen, setDropdownOpen, selectedStudents }) => {
  console.log("selectedStudents",selectedStudents)
  return (
    <div className="relative inline-block text-left lg:mt-0 mt-5">
      <button
        type="button"
        className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-slate-700 hover:to-slate-800"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen ? "true" : "false"}
      >
        Downloads
        <svg
          className="-mr-1 h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className="absolute z-20 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-down"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 text-xs" role="none">
            <button
              onClick={() => handleDownload(selectedStudents)}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-slate-50 hover:text-slate-700 transition-colors duration-150 ease-in-out rounded-md"
              role="menuitem"
            >
              Download Student Form
            </button>
            <button
              onClick={() => handleDownloadFeeReceipt(selectedStudents)}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-slate-50 hover:text-slate-700 transition-colors duration-150 ease-in-out rounded-md"
              role="menuitem"
            >
              Download Fee Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
