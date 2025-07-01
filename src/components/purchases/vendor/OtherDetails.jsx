import { useState } from "react";

const OtherDetails = () => {
  const [formData, setFormData] = useState({
    pan: "",
    currency: "",
    paymentTerm: "",
    document: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* PAN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PAN
        </label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Currency
        </label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a currency</option>
          <option value="currency">$</option>
          <option value="currency">₹</option>
        </select>
      </div>

      {/* Payment Term */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Term
        </label>
        <select
          name="paymentTerm"
          value={formData.paymentTerm}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Payment Term</option>
          <option value="currency">Due on Receipt</option>
          <option value="currency">Lorem ipsum dolor sit </option>
        </select>
      </div>

      {/* Price List */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price List
        </label>
        <select
          name="priceList"
          value={formData.priceList}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">List</option>
          <option value=" price-list">PriceBook-3</option>
          <option value=" price-list">PriceBook-4</option>
        </select>
      </div> */}

      {/* Document */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Document
        </label>
        <input
          type="file"
          name="document"
          value={formData.document}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
    </div>
  );
};

export default OtherDetails;
