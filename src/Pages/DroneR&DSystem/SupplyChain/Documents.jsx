import {
  ClockIcon,
  DocumentCheckIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import GrnInputForm from "../../../components/form/GrnInputForm";
import DrnInputForm from "../../../components/form/DrnInputForm";

const Documents = () => {
  const [showGrnForm, setShowGrnForm] = useState();
  const [showDrnForm, setShowDrnForm] = useState();
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending GRNs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <DocumentCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active DRNs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Expiry Requests
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Document Actions */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Document Management
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
            <DocumentCheckIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">
              Goods Received Note (GRN)
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Record receipt of goods from suppliers
            </p>
            <button
              onClick={() => setShowGrnForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create GRN
            </button>
            {showGrnForm && (
              <GrnInputForm onClose={() => setShowGrnForm(false)} />
            )}
          </div>
          <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">
              Damages Received Note (DRN)
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Report damaged goods and returns
            </p>
            <button
              onClick={() => setShowDrnForm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Create DRN
            </button>
            {showDrnForm && (
              <DrnInputForm onClose={() => setShowDrnForm(false)} />
            )}
          </div>
          <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center hover:border-yellow-500 hover:bg-yellow-50 transition-colors cursor-pointer">
            <ClockIcon className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">
              Expiry Requisition Note (ERN)
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Manage expired inventory removal
            </p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Create ERN
            </button>
          </div>
        </div>
      </div>

      {/* All Documents Management */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              All Documents
            </h3>
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="all">All Types</option>
                <option value="grn">GRN Only</option>
                <option value="drn">DRN Only</option>
                <option value="ern">ERN Only</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
                <option value="urgent">Urgent</option>
              </select>
              <input
                type="text"
                placeholder="Search documents..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Document ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Supplier/Item
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Quantity/Value
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Date Created
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* GRN Documents */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">GRN-001</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      GRN
                    </span>
                  </td>
                  <td className="py-3 px-4">MedSupply Co.</td>
                  <td className="py-3 px-4">500 units</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 10, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">GRN-002</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      GRN
                    </span>
                  </td>
                  <td className="py-3 px-4">PharmaTech Ltd.</td>
                  <td className="py-3 px-4">200 units</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Processed
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 9, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* DRN Documents */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">DRN-005</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      DRN
                    </span>
                  </td>
                  <td className="py-3 px-4">Damaged Syringes</td>
                  <td className="py-3 px-4">₹15,000</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Processed
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 9, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">DRN-006</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      DRN
                    </span>
                  </td>
                  <td className="py-3 px-4">Broken Vials</td>
                  <td className="py-3 px-4">₹8,500</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 8, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ERN Documents */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">ERN-012</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      ERN
                    </span>
                  </td>
                  <td className="py-3 px-4">Expired Antibiotics</td>
                  <td className="py-3 px-4">150 units</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Urgent
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 8, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">ERN-013</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      ERN
                    </span>
                  </td>
                  <td className="py-3 px-4">Expired Vaccines</td>
                  <td className="py-3 px-4">75 units</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">Jun 7, 2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="More"
                      >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing 1 to 6 of 47 documents
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
