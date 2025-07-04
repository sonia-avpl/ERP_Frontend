import { Mail, Phone, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OtherDetails from "../purchases/vendor/OtherDetails";
import Address from "../purchases/vendor/Address";
import ContactPerson from "../purchases/vendor/ContactPerson";
import BankDetails from "../purchases/vendor/BankDetails";
import { usePostFile } from "../../hooks/usePostFile";
import { usePatch } from "../../hooks/usePatch";

import { useDelete } from "../../hooks/useDelete";
import { baseUrl } from "../../utills/enum";

import { usePost } from "../../hooks/usePost";
import { FileModules } from "../../utills/enum";

const VendorForm = ({
  onClose,
  mode = "create",
  existingData = null,
  refetch,
}) => {
  const navigate = useNavigate();
  const { uploadImageOnSWithModule } = usePost();
  const [formData, setFormData] = useState({
    firstName: existingData?.firstName || "",
    lastName: existingData?.lastName || "",
    companyEmail: existingData?.companyEmail || "",
    companyName: existingData?.companyName || "",
    companyEmail: existingData?.companyEmail || "",
    displayNameType: existingData?.displayNameType || "",
    vendorPhoneNumber: existingData?.vendorPhoneNumber || "",
    vendorMobileNumber: existingData?.vendorMobileNumber || "",
    otherDetails: {
      gstNo: existingData?.otherDetails?.gstNo || "",
      pan: existingData?.otherDetails?.pan || "",
      paymentTerm: existingData?.otherDetails?.paymentTerm || "",
      currency: existingData?.otherDetails?.currency || "",
      document: existingData?.otherDetails?.document || null,
    },
    address: {
      billing: {
        country: existingData?.address?.billing?.country || "",
        state: existingData?.address?.billing?.state || "",
        city: existingData?.address?.billing?.city || "",
        pincode: existingData?.address?.billing?.pincode || "",
        address: existingData?.address?.billing?.address || "",
      },
      shipping: {
        country: existingData?.address?.shipping.country || "",
        state: existingData?.address?.shipping.state || "",
        city: existingData?.address?.shipping.city || "",
        pincode: existingData?.address?.shipping.pincode || "",
        address: existingData?.address?.shipping.address || "",
      },
    },
  });

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

  const {
    deleteData,
    loading: deleteLoading,
    error: deleteError,
  } = useDelete(token);

  const handleSave = async (e) => {
    e.preventDefault();

    const vendorData = {
      ...formData,
      contactPersons,
      bankDetails,
    };
    try {
      let res;
      if (mode === "edit") {
        // PATCH request to update vendor
        res = await patchData(`vendors/${existingData._id}`, vendorData);
        refetch();
      } else {
        // POST request to create new vendor
        res = await postData("vendors/add", vendorData);
      }

      console.log("formData", formData);
      const file = formData.otherDetails.document;
      delete vendorData.otherDetails.document;

      if (existingData) {
        let res = await patchData(`vendors/${existingData._id}`, vendorData);
        console.log("resd", res);
        if (file) {
          await uploadImageOnSWithModule([file], res._id, FileModules.Vendor);
        }
      } else {
        let res = await postData(`vendors/add`, vendorData);
        if (file) {
          await uploadImageOnSWithModule(
            [file],
            res.data._id,
            FileModules.Vendor
          );
        }
      }
    } catch (error) {
      console.error("Error saving vendor:", error);
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
                Company Email
              </label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="example@domain.com"
                  value={formData.companyEmail}
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

            <div style={{ display: activeTab === "other" ? "block" : "none" }}>
              <OtherDetails data={formData} setData={setFormData} />
            </div>
            <div
              style={{ display: activeTab === "address" ? "block" : "none" }}
            >
              <Address data={formData} setData={setFormData} />
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

        <div className="md:col-span-2 m-4 text-end space-x-2">
          {mode === "edit" && (
            <button
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this vendor?"
                );
                if (!confirmed) return;

                try {
                  await deleteData(`${baseUrl}/vendors/${existingData._id}`);
                  alert("Vendor deleted successfully");
                  navigate("/purchases/vendors");
                } catch (err) {
                  console.error("Delete failed:", err.message);
                }
              }}
              className="px-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Delete Vendor
            </button>
          )}

          <button
            onClick={handleSave}
            className="px-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {mode === "edit" ? "Update Vendor" : "Add Vendor"}
          </button>

          {(postLoading || patchLoading || deleteLoading) && (
            <p className="text-blue-500 mt-2">Processing...</p>
          )}

          {(postError || patchError || deleteError) && (
            <p className="text-red-600 mt-2">
              Error:{" "}
              {postError?.message ||
                patchError?.message ||
                deleteError?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorForm;
