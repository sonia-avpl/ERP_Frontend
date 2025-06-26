import SkuCard from "../../components/card/SkuCard";
import { MdPendingActions, MdOutlinePending } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbUrgent } from "react-icons/tb";
import ProcurementWorkflow from "../../components/SKU/procurement/ProcurementWorkflow";
import CreateRequisition from "../../components/SKU/procurement/CreateRequisition"
import PurchaseOrder from "../../components/SKU/procurement/PurchaseOrder"
import VendorManagement from "../../components/SKU/procurement/VendorManagement"
import EmergencyProcurement from "../../components/SKU/procurement/EmergencyProcurement"
import { useState } from "react";
const stats = [
  {
    title: "Pending Requisitions",
    value: "24",
    subtitle: "Awaiting approval",
    icon: <MdPendingActions className="h-5 w-5" />,
  },
  {
    title: "Open POs",
    value: "18",
    subtitle: "In progress",
    icon: <FaBoxOpen className="h-5 w-5" />,
  },
  {
    title: "Pending Deliveries",
    value: "12",
    subtitle: "To be received",
    icon: <MdOutlinePending className="h-5 w-5" />,
  },
  {
    title: "Urgent Procurements",
    value: "7",
    subtitle: "This week",
    icon: <TbUrgent className="h-5 w-5" />,
  },
];

const Procurement = () => {
  const [activeTab, setActiveTab] = useState("create");

  const tabs = [
    { id: "create", label: "Create Requisition" },
    { id: "purchase", label: "Purchase Orders" },
    { id: "vendor", label: "Vendor Management" },
    { id: "emergency", label: "Emergency Procurement" },
  ];
  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50">
        {stats.map((card, index) => (
          <SkuCard
            key={index}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        ))}
      </div>
      <ProcurementWorkflow />

      <div className="min-w-full max-w-7xl mx-auto p-6 bg-white rounded-xl shadow mt-10 text-sm">
        {/* Tabs */}
        <div className="flex border-b mb-6 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 font-semibold ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "create" && <CreateRequisition />}
        {activeTab === "purchase" && <PurchaseOrder />}
        {activeTab === "vendor" && <VendorManagement />}
        {activeTab === "emergency" && <EmergencyProcurement />}
      </div>
    </section>
  );
};

export default Procurement;
