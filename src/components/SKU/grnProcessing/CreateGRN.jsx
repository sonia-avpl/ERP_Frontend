import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsClipboard2Check } from "react-icons/bs";
import {
  FaBarcode,
  FaEdit,
  FaPaperPlane,
  FaPlus,
  FaTrash,
  FaSave,
} from "react-icons/fa";

const CreateGRN = () => {
  const navigate = useNavigate();

  const tableData = [
    {
      skuCode: "SKU-EL-1001",
      ItemDescription: "lorem epsum",
      orderQty: "25 unit",
      ReceivedQty: "25",
      uom: "unit",
      unitPrice: "₹12,500",
      total: "₹12,500",
      action: "₹12,500",
    },
    {
      skuCode: "SKU-EL-1001",
      ItemDescription: "lorem epsum",
      orderQty: "25 unit",
      ReceivedQty: "25",
      uom: "unit",
      unitPrice: "₹12,500",
      total: "₹45000",
      action: "₹12,500",
    },
    {
      skuCode: "SKU-EL-1001",
      ItemDescription: "lorem epsum",
      orderQty: "25 unit",
      ReceivedQty: "25",
      uom: "unit",
      unitPrice: "₹12,500",
      total: "₹12,500",
      action: "₹12,500",
    },
  ];

  const formValues = {
    securityRef: "",
    vendor: "",
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    invoiceVal: "",
    procurementType: "",
    deliveryNote: "",
    grnDate: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <>
      <div className="max-w-full bg-white rounded-xl shadow p-6 mx-auto text-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BsClipboard2Check className="text-blue-600 text-2xl" />
          Create Goods Receipt Note
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Security Reference <span className="text-red-700">*</span>
            </label>
            <input
              name="securityRef"
              value={formData.securityRef}
              onChange={handleChange}
              className={inputClass}
              placeholder="SEC-2023-00124"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Vendor <span className="text-red-700">*</span>
            </label>
            <select
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Vendor</option>
              <option>Tech Supplies Ltd. (Registered)</option>
              <option>Office Solution Inc. (Registered)</option>
              <option>Emergency Procurement</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Invoice Number<span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className={inputClass}
              placeholder="75000"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Invoice Date<span className="text-red-700">*</span>
            </label>
            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Invoice Value (INR) <span className="text-red-700">*</span>
            </label>
            <input
              type="date"
              name="invoiceVal"
              value={formData.invoiceVal}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Procurement Type <span className="text-red-700">*</span>
            </label>
            <select
              name="procurementType"
              value={formData.procurementType}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Regular (Registered Vendor)</option>
              <option>Local Vendor</option>
              <option>Emergency Procurement</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Delivery Note <span className="text-red-700">*</span>
            </label>
            <input
              name="deliveryNote"
              value={formData.deliveryNote}
              onChange={handleChange}
              className={inputClass}
              placeholder="DN-2309-1024"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              GRN Date <span className="text-red-700">*</span>
            </label>
            <input
              type="date"
              name="grnDate"
              value={formData.grnDate}
              onChange={handleChange}
              className={inputClass}
              placeholder="Explain the need for these items"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-base">Requested Items</h3>
          <div className="flex space-x-4">
            <button className=" flex items-center gap-2 text-xs text-black px-4 py-2 rounded-lg bg-gray-300 hover:text-white  hover:bg-gray-500">
              <FaBarcode /> Add Item
            </button>
            <button className=" flex items-center gap-2 text-xs text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
              <FaPlus /> Add Item
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left bg-white">
            <tr className="border border-b-gray-400">
              <th className="py-4 px-3">SKU Code</th>
              <th className="py-4 px-3">Item Description</th>
              <th className="py-4 px-3">Order Qty</th>
              <th className="py-4 px-3">Received Qty</th>
              <th className="py-4 px-3">UOM</th>
              <th className="py-4 px-3">Unit Price</th>
              <th className="py-4 px-3">Total</th>
              <th className="py-4 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="border border-b-gray-400">
                <td className="py-4 px-3">{item.skuCode}</td>
                <td className="py-4 px-3">{item.ItemDescription}</td>
                <td className="py-4 px-3">{item.orderQty}</td>
                <td className="py-4 px-3 text-center">{item.ReceivedQty}</td>
                <td className="py-4 px-3">{item.uom}</td>
                <td className="py-4 px-3">{item.unitPrice}</td>
                <td className="py-4 px-3">{item.total}</td>
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
        <button className="flex items-center gap-2 text-white px-4 py-2  bg-blue-800 hover:bg-blue-900 rounded-lg">
          <FaSave /> Save GRN
        </button>
        <button
          onClick={() => navigate("/quality-control")}
          className="flex items-center gap-2 text-white px-4 py-2  bg-green-600 hover:bg-green-700 rounded-lg"
        >
          <FaPaperPlane /> Submit for QC
        </button>
      </div>
      
    </>
  );
};

export default CreateGRN;
