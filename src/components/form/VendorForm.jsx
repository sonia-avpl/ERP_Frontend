// import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { Mail, Phone, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OtherDetails from "../purchases/vendor/OtherDetails";
import Address from "../purchases/vendor/Address";
import ContactPerson from "../purchases/vendor/ContactPerson";
import BankDetails from "../purchases/vendor/BankDetails";

const VendorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    workPhone: "",
    mobile: "",
  });
  const [otherDetails, setOtherDetails] = useState({});
  const [addressDetails, setAddressDetails] = useState({});
  const [contactPersons, setContactPersons] = useState({});
  const [bankDetails, setBankDetails] = useState([]);

  const [activeTab, setActiveTab] = useState("other");

  const tabs = [
    { id: "other", label: "Other Details" },
    { id: "address", label: "Address" },
    { id: "contact", label: "Contact Person" },
    { id: "bank", label: "Bank Details" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const vendorData = {
      ...formData,
      otherDetails,
      addressDetails,
      contactPersons,
      bankDetails,
    };

    console.log("Collected Vendor Data:", vendorData);

    const savedVendors = JSON.parse(localStorage.getItem("vendorList")) || [];
    savedVendors.push(vendorData);
    localStorage.setItem("vendorList", JSON.stringify(savedVendors));

    alert("Vendor saved successfully!");
    navigate(-1);
  };

  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  return (
    <section className="w-full bg-white p-6 md:p-8 lg:p-10 mx-auto max-w-6xl rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Vendor</h2>
        <button onClick={() => navigate(-1)}>
          <X className="w-6 h-6 text-gray-500 hover:text-gray-700 transition duration-150" />
        </button>
      </div>

      <div className="mx-auto p-6 space-y-6">
        <div>
          {/* primary contact */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Contact <span className="text-gray-400">(i)</span>
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/3 border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              F
              onChange={handleChange}
              className="w-1/3 border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Vendor Display Name */}
        <div>
          <label className="block text-sm font-medium text-red-600 mb-1">
            Vendor Display Name* <span className="text-gray-400">(i)</span>
          </label>
          <select
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a display name</option>
            <option value="Use Company Name">Use Company Name</option>
            <option value="Use Contact Name">Use Contact Name</option>
          </select>
        </div>

        {/* Vendor Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor Email <span className="text-gray-400">(i)</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded p-2">
            <Mail className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Vendor Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor Phone <span className="text-gray-400">(i)</span>
          </label>
          <div className="flex gap-4">
            <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
              <Phone className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="tel"
                name="workPhone"
                placeholder="Work Phone"
                value={formData.workPhone}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
              <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>
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
        {activeTab === "other" && (
          <OtherDetails data={otherDetails} setData={setOtherDetails} />
        )}
        {activeTab === "address" && (
          <Address data={addressDetails} setData={setAddressDetails} />
        )}
        {activeTab === "contact" && (
          <ContactPerson data={contactPersons} setData={setContactPersons} />
        )}
        {activeTab === "bank" && (
          <BankDetails data={bankDetails} setData={setBankDetails} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8 px-6 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default VendorForm;
