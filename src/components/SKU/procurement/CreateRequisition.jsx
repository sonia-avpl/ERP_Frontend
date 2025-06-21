import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { BsClipboard2Check } from "react-icons/bs";

const CreateRequisition = () => {
  const formValues = {
    department: "",
    requestedBy: "",
    requestDate: new Date().toISOString().split("T")[0],
    requiredByDate: "",
    priority: "Normal",
    procurementType: "Regular (Registered Vendor)",
    justification: "",
  };

  const [formData, setFormData] = useState(formValues);
  const [items] = useState([
    {
      description: "Wireless Mouse",
      sku: "SKU-EL-1001",
      quantity: "25 units",
      cost: "₹12,500",
    },
    {
      description: "Ergonomic Chair",
      sku: "SKU-OF-2056",
      quantity: "10 units",
      cost: "₹45,000",
    },
    {
      description: "Printer Ink Cartridge",
      sku: "SKU-CS-3045",
      quantity: "30 units",
      cost: "₹24,000",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div className="max-w-full bg-white rounded-xl shadow p-6 mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <BsClipboard2Check className="text-blue-600 text-2xl" />
        New Purchase Requisition
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Requesting Department <span className="text-red-700">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Requested By <span className="text-red-700">*</span></label>
          <input
            name="requestedBy"
            value={formData.requestedBy}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter requester name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Request Date <span className="text-red-700">*</span></label>
          <input
            type="date"
            name="requestDate"
            value={formData.requestDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Required By Date <span className="text-red-700">*</span></label>
          <input
            type="date"
            name="requiredByDate"
            value={formData.requiredByDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Priority <span className="text-red-700">*</span></label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Normal</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Procurement Type <span className="text-red-700">*</span></label>
          <select
            name="procurementType"
            value={formData.procurementType}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Regular (Registered Vendor)</option>
            <option>Emergency Procurement</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1 font-semibold text-gray-700">Justification <span className="text-red-700">*</span></label>
          <textarea
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            className={inputClass}
            placeholder="Explain the need for these items"
            rows={3}
          ></textarea>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-base">Requested Items</h3>
          <button className=" flex items-center gap-2 text-xs text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
            <FaPlus /> Add Item
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left bg-white">
            <tr className="border border-b-gray-400">
              <th className="py-4 px-3">Item Description</th>
              <th className="py-4 px-3">SKU</th>
              <th className="py-4 px-3">Quantity</th>
              <th className="py-4 px-3">Estimated Cost</th>
              <th className="py-4 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border border-b-gray-400">
                <td className="py-4 px-3">{item.description}</td>
                <td className="py-4 px-3">{item.sku}</td>
                <td className="py-4 px-3">{item.quantity}</td>
                <td className="py-4 px-3">{item.cost}</td>
                <td className="py-4 px-3 space-x-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg border-gray-400 hover:bg-gray-400 hover:text-white">
          Cancel
        </button>
        <button className="flex items-center gap-2 text-white px-4 py-2  bg-blue-600 hover:bg-blue-700 rounded-lg">
          <FaPaperPlane /> Submit for Approval
        </button>
      </div>
    </div>
  );
};

export default CreateRequisition;
