import { useState } from "react";
import { FaFileImport, FaPaperPlane } from "react-icons/fa";
import { FaMagnifyingGlass, FaListCheck } from "react-icons/fa6";
import { IoAlert } from "react-icons/io5";
import RecentQCActivities from "../../components/card/RecentQCActivities";

const QualityControl = () => {
  const [formData, setFormData] = useState({
    grnRef: "",
    qcType: "",
    qcSupervisor: "",
    qcDate: "",
  });

  // discrepancy form data
  const [discrepancyFormData, setDiscrepancyFormData] = useState({
    discrepancyType: "",
    discrepancyValue: "",
    responsibleParty: "",
    discrepancyNote: "",
  });
  // table data
  const tableData = [
    {
      skuCode: "SKU-EL-1001",
      ItemDescription: "lorem epsum",
      ReceivedQty: "25 units",
      inspectedQty: "25 units",
      acceptedQty: "24 units",
      rejectedQty: "1 unit",
      rejectedReason: ["select reason", "Damage", "Wrong Item", "Expired"],
      status: "Rejected",
    },
    {
      skuCode: "SKU-OF-2056",
      ItemDescription: "lorem epsum",
      ReceivedQty: "10 units",
      inspectedQty: "10 units",
      acceptedQty: "10 units",
      rejectedQty: "0 units",
      rejectedReason: ["select reason", "Damage", "Wrong Item", "Expired"],
      status: "Accepted",
    },
    {
      skuCode: "SKU-CS-3045",
      ItemDescription: "lorem epsum",
      ReceivedQty: "30 units",
      inspectedQty: "30 units",
      acceptedQty: "30 units",
      rejectedQty: "0 units",
      rejectedReason: ["select reason", "Damage", "Wrong Item", "Expired"],
      status: "Accepted",
    },
  ];

  // recent data
  const recentData = [
    {
      grnNumber: "GRN-2023-00123",
      status: "Completed",
      vendor: "Office Solutions Inc.",
      invoiceValue: 45200,
      qcType: "100% QC",
      qcResult: "Fully Accepted",
      processedBy: "Priya Sharma",
    },
    {
      grnNumber: "GRN-2023-00124",
      status: "Discrepancy",
      vendor: "Tech Supplies Ltd.",
      invoiceValue: 38900,
      qcType: "Spot QC",
      qcResult: "Partially Accepted",
      processedBy: "Rahul Mehta",
    },
    {
      grnNumber: "GRN-2023-00125",
      status: "In Progress",
      vendor: "Global Stationery Co.",
      invoiceValue: 52600,
      qcType: "100% QC",
      qcResult: "Fully Accepted",
      processedBy: "Anita Roy",
    },
  ];
  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiscrepancyChange = (e) => {
    const { name, value } = e.target;
    setDiscrepancyFormData((prev) => ({ ...prev, [name]: value }));
  };

  // input class
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <>
      <div className="max-w-full bg-white rounded-xl shadow p-6 mx-auto text-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FaMagnifyingGlass className="text-violet-600 mt-1" />
          <span className=""> Quality Control Processing</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              GRN Reference <span className="text-red-700">*</span>
            </label>
            <select
              name="grnRef"
              value={formData.grnRef}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select GRN</option>
              <option>GRN-2023-00124 (Tech Supplies Ltd.)</option>
              <option>GRN-2023-00125 (Office Solutions)</option>
              <option>GRN-2023-00126 (Local Stationers)</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              QC Type <span className="text-red-700">*</span>
            </label>
            <input
              name="qcType"
              value={formData.qcType}
              onChange={handleChange}
              className={inputClass}
              placeholder="100% QC (Invoice > ₹500)"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              QC Supervisor <span className="text-red-700">*</span>
            </label>
            <input
              name="qcSupervisor"
              value={formData.qcSupervisor}
              onChange={handleChange}
              className={inputClass}
              placeholder="name..."
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              QC Supervisor <span className="text-red-700">*</span>
            </label>
            <input
              type="date"
              name="qcDate"
              value={formData.qcDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base">QC Inspection Details</h3>

            <button className=" flex items-center gap-2 text-black px-4 py-2 rounded-lg bg-gray-300 hover:text-white  hover:bg-gray-500">
              <FaFileImport /> Import Template
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left bg-white">
              <tr className="bg-[#D3D3D3]">
                <th className="py-4 px-3">SKU Code</th>
                <th className="py-4 px-3">Item Description</th>
                <th className="py-4 px-3">Received Qty</th>
                <th className="py-4 px-3">Inspected Qty</th>
                <th className="py-4 px-3">Accepted Qty</th>
                <th className="py-4 px-3">Rejected Qty</th>
                <th className="py-4 px-3">Rejected Reason</th>
                <th className="py-4 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border border-b-gray-400">
                  <td className="py-4 px-3">{item.skuCode}</td>
                  <td className="py-4 px-3">{item.ItemDescription}</td>
                  <td className="py-4 px-3">{item.ReceivedQty}</td>
                  <td className="py-4 px-3 text-center">{item.inspectedQty}</td>
                  <td className="py-4 px-3">{item.acceptedQty}</td>
                  <td className="py-4 px-3">{item.rejectedQty}</td>
                  <td className="py-4 px-3">
                    <select className="border border-gray-400 p-2 rounded-md">
                      {item.rejectedReason.map((val, index) => (
                        <option key={index}>{val}</option>
                      ))}
                    </select>
                  </td>
                  <td
                    className={`py-4 px-3 ${
                      item.status === "Rejected"
                        ? "text-red-700"
                        : "text-green-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancy Detected */}

      <div className="max-w-full bg-red-200 rounded-xl shadow p-6 mx-4 text-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <IoAlert className="bg-red-600 rounded-full text-white p-1" />
          <span className="text-red-500">Discrepancy Detected</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Discrepancy Type <span className="text-red-700">*</span>
            </label>
            <select
              name="discrepancyType"
              value={formData.discrepancyType}
              onChange={handleDiscrepancyChange}
              className={inputClass}
            >
              <option value="">Select type</option>
              <option>Quantity Mismatch</option>
              <option>Quality Issue</option>
              <option>Damage Goods</option>
              <option>Specification Mismatch</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Discrepancy Value <span className="text-red-700">*</span>
            </label>
            <input
              name="discrepancyValue"
              value={discrepancyFormData.discrepancyValue}
              onChange={handleDiscrepancyChange}
              className={inputClass}
              placeholder="₹500.00"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Responsible Party <span className="text-red-700">*</span>
            </label>
            <select
              name="responsibleParty"
              value={formData.responsibleParty}
              onChange={handleDiscrepancyChange}
              className={inputClass}
            >
              <option value="">Select party</option>
              <option>Vendor</option>
              <option>Transporter</option>
              <option>Internal Handling</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Discrepancy Notes <span className="text-red-700">*</span>
            </label>
            <textarea
              name="discrepancyNote"
              value={discrepancyFormData.discrepancyNote}
              onChange={handleDiscrepancyChange}
              className={inputClass}
              placeholder="Note..."
            />
          </div>
        </div>
      </div>

      <hr className=" my-6 h-1 bg-gray-300 shadow-lg" />

      <div className="flex justify-end gap-4 mt-6 mx-4">
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg border-gray-400 hover:bg-gray-400 hover:text-white">
          Cancel
        </button>
        <button className="flex items-center gap-2 text-white px-4 py-2  bg-orange-500 hover:bg-orange-700 rounded-lg">
          Create Discrepancy Note
        </button>
        <button className="flex items-center gap-2 text-white px-4 py-2  bg-green-600 hover:bg-green-700 rounded-lg">
          <FaPaperPlane /> Complete QC
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto bg-white rounded-md shadow-md p-6 sm:p-8 text-sm my-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
          <FaListCheck className="text-blue-600" />
          Recent QC Activities
        </h2>

        <hr className="my-4 border-t-2 border-gray-200" />

        <div className="">
          <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {recentData.map((item, index) => (
              <RecentQCActivities key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityControl;
