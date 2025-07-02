import { Mail, Phone, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OtherDetails from "../purchases/vendor/OtherDetails";
import Address from "../purchases/vendor/Address";
import ContactPerson from "../purchases/vendor/ContactPerson";
import BankDetails from "../purchases/vendor/BankDetails";
import { usePostFile } from "../../hooks/usePostFile";
import { usePatch } from "../../hooks/usePatch";

const VendorForm = ({ onClose, mode = "create", existingData = null }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: existingData?.firstName || "",
    lastName: existingData?.lastName || "",
    companyName: existingData?.companyName || "",
    displayNameType: existingData?.displayNameType || "",
    email: existingData?.email || "",
    vendorPhoneNumber: existingData?.vendorPhoneNumber || "",
    vendorMobileNumber: existingData?.vendorMobileNumber || "",
  });

  const [otherDetails, setOtherDetails] = useState(
    existingData?.otherDetails || {}
  );
  const [addressDetails, setAddressDetails] = useState(
    existingData?.address || {
      billing: { country: "", state: "", city: "", pincode: "", address: "" },
      shipping: { country: "", state: "", city: "", pincode: "", address: "" },
    }
  );

  const [contactPersons, setContactPersons] = useState(
    existingData?.contactPersons || []
  );
  const [bankDetails, setBankDetails] = useState(
    existingData?.bankDetails || []
  );

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

  const token = localStorage.getItem("token");
  const {
    postData,
    loading: postLoading,
    error: postError,
  } = usePostFile(token);
  const {
    patchData,
    loading: patchLoading,
    error: patchError,
  } = usePatch(token);

  const handleSave = async (e) => {
    e.preventDefault();

    const vendorData = {
      ...formData,
      otherDetails,
      address: addressDetails,
      contactPersons,
      bankDetails,
    };

    try {
      let res;
      if (mode === "edit") {
        // PATCH request to update vendor
        res = await patchData(`vendors/${existingData._id}`, vendorData);
      } else {
        // POST request to create new vendor
        res = await postData("vendors/add", vendorData);
      }

      if (res) {
        alert(`Vendor ${mode === "edit" ? "updated" : "saved"} successfully!`);
        onClose();
      }
    } catch (err) {
      console.error("Save failed:", err.message);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-4xl h-[90vh] overflow-hidden rounded-2xl shadow-xl relative flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">New Vendor</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Primary Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Contact
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
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Vendor Display Name
              </label>
              <select
                name="displayNameType"
                value={formData.displayNameType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Display Name</option>
                <option value="Company Name">Company Name</option>
                <option value="Contact Name">Contact Name</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Email
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

            {/* Phones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Phone
              </label>
              <div className="flex gap-4">
                <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="vendorPhoneNumber"
                    placeholder="Mobile Number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.vendorPhoneNumber}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                  <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="vendorMobileNumber"
                    placeholder="Mobile Number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.vendorMobileNumber}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Tabs & Content ---------- */}
          <div className="px-6 pb-6">
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

            {/* Conditional Tab Content */}
            <div style={{ display: activeTab === "other" ? "block" : "none" }}>
              <OtherDetails data={otherDetails} setData={setOtherDetails} />
            </div>
            <div
              style={{ display: activeTab === "address" ? "block" : "none" }}
            >
              <Address data={addressDetails} setData={setAddressDetails} />
            </div>
            <div
              style={{ display: activeTab === "contact" ? "block" : "none" }}
            >
              <ContactPerson
                data={contactPersons}
                setData={setContactPersons}
              />
            </div>
            <div style={{ display: activeTab === "bank" ? "block" : "none" }}>
              <BankDetails data={bankDetails} setData={setBankDetails} />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 m-4 text-end">
          <button
            onClick={handleSave}
            className="px-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Add Vendor
          </button>
          {(postLoading || patchLoading) && (
            <p className="text-blue-500 mt-2">Saving vendor...</p>
          )}

          {(postError || patchError) && (
            <p className="text-red-600 mt-2">
              Error: {postError?.message || patchError?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorForm;
