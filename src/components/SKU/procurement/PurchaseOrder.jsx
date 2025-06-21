import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  PrinterIcon,
  ClipboardDocumentIcon,
  TruckIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const purchaseOrders = [
  {
    number: "PO-2023-1024",
    vendor: "Tech Supplies Ltd.",
    issueDate: "2023-10-15",
    deliveryDate: "2023-10-25",
    value: "₹78,500",
    status: "Approved",
    actions: ["view", "edit", "print"],
  },
  {
    number: "PO-2023-1025",
    vendor: "Office Solutions Inc.",
    issueDate: "2023-10-18",
    deliveryDate: "2023-10-28",
    value: "₹45,200",
    status: "Pending",
    actions: ["view", "CheckCircleIcon"],
  },
  {
    number: "PO-2023-1026",
    vendor: "Local Stationers",
    issueDate: "2023-10-20",
    deliveryDate: "2023-10-22",
    value: "₹12,800",
    status: "Delivered",
    actions: ["view", "copy"],
  },
  {
    number: "PO-2023-1027",
    vendor: "IT Hardware Solutions",
    issueDate: "2023-10-22",
    deliveryDate: "2023-10-30",
    value: "₹1,24,300",
    status: "Approved",
    actions: ["view", "ship"],
  },
];

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Delivered: "bg-blue-100 text-blue-700",
};

const PurchaseOrder = () => {
  const [data] = useState(purchaseOrders);
  return (
    <div className="max-w-full bg-white rounded-xl shadow p-6 mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Purchase Orders</h3>
        <div className="flex items-center space-x-2">
          <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
            🔍 Filters
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            + New PO
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="py-2 px-4">PO Number</th>
              <th className="py-2 px-4">Vendor</th>
              <th className="py-2 px-4">Issued Date</th>
              <th className="py-2 px-4">Delivery Date</th>
              <th className="py-2 px-4">Total Value</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((po, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="py-2 px-4">{po.number}</td>
                <td className="py-2 px-4">{po.vendor}</td>
                <td className="py-2 px-4">{po.issueDate}</td>
                <td className="py-2 px-4">{po.deliveryDate}</td>
                <td className="py-2 px-4">{po.value}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      statusStyles[po.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {po.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    {po.actions.includes("view") && (
                      <EyeIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                    {po.actions.includes("CheckCircleIcon") && (
                      <CheckCircleIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                    {po.actions.includes("edit") && (
                      <PencilSquareIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                    {po.actions.includes("print") && (
                      <PrinterIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                    {po.actions.includes("copy") && (
                      <ClipboardDocumentIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                    {po.actions.includes("ship") && (
                      <TruckIcon className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrder;
