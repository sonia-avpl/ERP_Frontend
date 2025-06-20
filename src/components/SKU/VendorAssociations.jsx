import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa6";

const VendorAssociations = () => {
  const [vendorForm, setVendorForm] = useState({
    sku: "",
    vendor: "",
    leadTime: "",
    unitCost: "",
    moq: "",
    preferred: "No",
  });

  const [vendors, setVendors] = useState([
    {
      initials: "TS",
      name: "Tech Supplies Ltd.",
      status: "Preferred",
      leadTime: "3-5 days",
      cost: "₹450.00",
      moq: "50 units",
      performance: 92,
    },
    {
      initials: "OS",
      name: "Office Solutions Inc.",
      status: "Active",
      leadTime: "7-10 days",
      cost: "₹420.00",
      moq: "100 units",
      performance: 85,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorForm({ ...vendorForm, [name]: value });
  };

  return (
    <div className="text-sm p-4 max-w-7xl mx-auto bg-white rounded-xl shadow mt-8">
      <h2 className="text-lg font-semibold flex items-center mb-1">
        <span className="text-xl mr-2"><FaHandshake /></span> Vendor Associations
      </h2>
      <p className="mb-6 text-gray-600">
        Manage vendor relationships for each SKU
      </p>

      {/* Form */}
      <form className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Select SKU</label>
            <select
              name="sku"
              value={vendorForm.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Search or select SKU</option>
              <option>SKU-EL-1001</option>
              <option>SKU-CS-3045</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Vendor</label>
            <select
              name="vendor"
              value={vendorForm.vendor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Search or select vendor</option>
              <option>Tech Supplies Ltd.</option>
              <option>Office Solutions Inc.</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Lead Time (Days)</label>
            <input
              type="text"
              name="leadTime"
              placeholder="Average delivery time"
              value={vendorForm.leadTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Unit Cost (INR)</label>
            <input
              type="number"
              name="unitCost"
              placeholder="Cost per unit"
              value={vendorForm.unitCost}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Minimum Order Quantity
            </label>
            <input
              type="number"
              name="moq"
              placeholder="Minimum order units"
              value={vendorForm.moq}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Preferred Vendor</label>
            <select
              name="preferred"
              value={vendorForm.preferred}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() =>
              setVendorForm({
                sku: "",
                vendor: "",
                leadTime: "",
                unitCost: "",
                moq: "",
                preferred: "No",
              })
            }
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            ✖ Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            🔗 Associate Vendor
          </button>
        </div>
      </form>

      {/* Vendor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((v, idx) => (
          <div key={idx} className="bg-white p-4 border rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {v.initials}
              </div>
              <div>
                <div className="font-semibold">{v.name}</div>
                <div className="text-xs text-gray-500">Registered Vendor</div>
              </div>
            </div>

            <div className="text-xs text-gray-700 space-y-1">
              <div>
                <strong>Lead Time:</strong> {v.leadTime}
              </div>
              <div>
                <strong>Unit Cost:</strong> {v.cost}
              </div>
              <div>
                <strong>MOQ:</strong> {v.moq}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    v.status === "Preferred"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {v.status}
                </span>
              </div>
              <div className="mt-2 font-medium">Performance Score</div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: `${v.performance}%` }}
                />
              </div>
              <div className="text-right text-xs text-gray-500">
                {v.performance}%
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                ✏️ Edit
              </button>
              <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-red-100 text-red-600">
                🗑 Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorAssociations;
