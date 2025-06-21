import { useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import VendorCard from "../../card/VendorCard";
const VendorManagement = () => {
  const initialFormData = {
    vendorName: "Vineet",
    vendorType: "Registered Vendor",
    contactName: "sph aviation",
    email: "vineetsphaviation@gmail.com",
    phone: "+91 9120508661",
    gstin: "ABC123",
    paymentTerms: "Net 30",
    primaryCategory: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVendors((prev) => [...prev, formData]);
    setFormData(initialFormData);

    alert("Vendor Registered Successfully!");
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-blue-600 text-2xl">
          <MdPersonAddAlt1 className="h-8 w-8" />
        </span>{" "}
        Register New Vendor
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Vendor Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter vendor name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Vendor Type <span className="text-red-700">*</span>
          </label>
          <select
            name="vendorType"
            value={formData.vendorType}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option>Registered Vendor</option>
            <option>Temporary Vendor</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Contact Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contact person"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="contact@vendor.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Phone <span className="text-red-700">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone} 
            onChange={handleChange}
            className={inputClass}
            placeholder="+91 9876543210"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Tax ID/GSTIN *
          </label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter tax identification"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Payment Terms <span className="text-red-700">*</span>
          </label>
          <select
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option>Net 30</option>
            <option>Net 15</option>
            <option>Immediate</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Primary Category <span className="text-red-700">*</span>
          </label>
          <select
            name="primaryCategory"
            value={formData.primaryCategory}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select category</option>
            <option>Electronics</option>
            <option>Office Supplies</option>
            <option>Furniture</option>
            <option>Consumables</option>
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
          <button
            type="button"
            className="border-gray-400 flex justify-center items-center px-4 py-2 rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Register Vendor
          </button>
        </div>
      </form>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VendorCard vendor={initialFormData} />
        {vendors.map((vendor, index) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default VendorManagement;
