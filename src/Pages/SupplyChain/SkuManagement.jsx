import { useState } from "react";
import SkuCard from "../../components/card/SkuCard";
import CreateSku from "../../components/SKU/CreateSku";
import BrowseSku from "../../components/SKU/BrowseSku";
import PendingRequest from "../../components/SKU/PendingRequest";
import VendorAssociations from "../../components/SKU/VendorAssociations";
import Categories from "../../components/SKU/Categories";
import BulkAssociation from "../../components/SKU/BulkAssociation";

const stats = [
  {
    title: "Active SKUs",
    value: "1,248",
    subtitle: "Across all categories",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h2v18H3V3zm4 0h2v18H7V3zm4 0h1v18h-1V3zm3 0h2v18h-2V3zm4 0h2v18h-2V3z" />
      </svg>
    ),
  },
  {
    title: "Pending Requests",
    value: "42",
    subtitle: "New SKU creation requests",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 6v6l4 2m5-4a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Low Stock Items",
    value: "37",
    subtitle: "Below reorder level",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  {
    title: "Expiring Soon",
    value: "18",
    subtitle: "SKUs with upcoming expiry",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 2h12m0 0v6a6 6 0 01-6 6 6 6 0 01-6-6V2m0 20h12m0 0v-6a6 6 0 00-6-6 6 6 0 00-6 6v6" />
      </svg>
    ),
  },
];

const SkuManagement = () => {
  const [activeTab, setActiveTab] = useState("create");

  const tabs = [
    { id: "create", label: "Create New SKU" },
    { id: "pending", label: "Pending Requests" },
    { id: "browse", label: "Browse SKUs" },
    { id: "vendors", label: "Vendor Associations" },
    { id: "categories", label: "Categories" },
    { id: "bulk", label: "Bulk Association" },
  ];
  return (
    <section className="max-w-full">
      {/* SKU Card */}
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
      <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow mt-10 text-sm">
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
        {activeTab === "create" && <CreateSku />}
        {activeTab === "pending" && <PendingRequest />}
        {activeTab === "browse" && <BrowseSku />}
        {activeTab === "vendors" && <VendorAssociations />}
        {activeTab === "categories" && <Categories />}
        {activeTab === "bulk" && <BulkAssociation />}
        
      </div>
    </section>
  );
};

export default SkuManagement;
