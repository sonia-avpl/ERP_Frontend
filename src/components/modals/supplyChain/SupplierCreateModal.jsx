import { useState } from "react";
import SelectField from "../../form/SelectField";
import InputField from "../../form/InputField";
import { usePost } from "../../../hooks/usePost";
import { baseUrl } from "../../../utills/enum";


const SupplierCreateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierType: "",
    supplierEmail: "",
    supplierPhone: "",
    supplierAddress: "",
    supplierGSTNumber: "",
    supplierLocation: "",
    supplierBankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    },
  });
  const { postData, loading, error, response } = usePost();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("bank.")) {
      const bankField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        supplierBankDetails: {
          ...prev.supplierBankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postData(`${baseUrl}/supplier/add`, formData);
    setFormData({
      supplierName: "",
      supplierType: "",
      supplierEmail: "",
      supplierPhone: "",
      supplierAddress: "",
      supplierGSTNumber: "",
      supplierLocation: "",
      supplierBankDetails: {
        bankName: "",
        accountNumber: "",
        ifscCode: "",
      },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white relative max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Supplier Name"
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              required
            />
            <SelectField
              label="Supplier Type"
              name="supplierType"
              value={formData.supplierType}
              onChange={handleChange}
              required
              options={[
                "Vendor",
                "Manufacturer",
                "Distributor",
                "Service Provider",
                "Wholesaler",
              ]}
            />
            <InputField
              label="Email"
              type="email"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              type="tel"
              name="supplierPhone"
              value={formData.supplierPhone}
              onChange={handleChange}
            />
            <InputField
              label="Address"
              type="text"
              name="supplierAddress"
              value={formData.supplierAddress}
              onChange={handleChange}
            />
            <InputField
              label="GST Number"
              type="text"
              name="supplierGSTNumber"
              value={formData.supplierGSTNumber}
              onChange={handleChange}
            />
            <InputField
              label="Location"
              type="text"
              name="supplierLocation"
              value={formData.supplierLocation}
              onChange={handleChange}
            />
            <InputField
              label="Bank Name"
              type="text"
              name="bank.bankName"
              value={formData.supplierBankDetails.bankName}
              onChange={handleChange}
            />
            <InputField
              label="Account Number"
              type="text"
              name="bank.accountNumber"
              value={formData.supplierBankDetails.accountNumber}
              onChange={handleChange}
            />
            <InputField
              label="IFSC Code"
              type="text"
              name="bank.ifscCode"
              value={formData.supplierBankDetails.ifscCode}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Create Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierCreateModal;
