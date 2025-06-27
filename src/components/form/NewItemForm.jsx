import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewItemForm = () => {
  const itemFormData = {
    type: "Goods",
    name: "",
    sku: "",
    unit: "",
    images: [],
    sellingPrice: "",
    salesAccount: "Sales",
    salesDescription: "",
    costPrice: "",
    purchaseAccount: "Cost of Goods Sold",
    purchaseDescription: "",
    preferredVendor: "",
    trackInventory: false,
    inventoryAccount: "",
    valuationMethod: "",
    openingStock: "",
    openingStockRate: "",
    reorderPoint: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(itemFormData);

  const [dragActive, setDragActive] = useState(false);

  const [salesEnabled, setSalesEnabled] = useState(true);
  const [purchaseEnabled, setPurchaseEnabled] = useState(true);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFiles = (files) => {
    const selected = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selected].slice(0, 15),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    const base64Images = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      })
    );

    setFormData((prev) => ({
      ...prev,
      images: base64Images,
    }));
  };

  //   handle remove image
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/items",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Saved to backend:", response.data);
      alert("Item saved successfully!");
      navigate(-1); // Navigate back
    } catch (error) {
      console.error("API error:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(message);
    }
  };

  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  return (
    <section className="w-full bg-white p-6 md:p-8 lg:p-10 mx-auto max-w-6xl rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Item</h2>
        <button onClick={() => navigate(-1)}>
          <X className="w-6 h-6 text-gray-500 hover:text-gray-700 transition duration-150" />
        </button>
      </div>
      <div className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Section */}
          <div className="space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-gray-400">(?)</span>
              </label>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="Goods"
                    checked={formData.type === "Goods"}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <span>Goods</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="Service"
                    checked={formData.type === "Service"}
                    onChange={handleChange}
                  />
                  <span>Service</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU <span className="text-gray-400">(?)</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit <span className="text-red-600">*</span>{" "}
                <span className="text-gray-400">(?)</span>
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select or type to add</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="ltr">Litre (ltr)</option>
              </select>
            </div>
          </div>

          {/* Right Section – Image Upload */}
          <div
            className={`h-full flex flex-col items-center justify-center border-2 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            } border-dashed rounded-md p-6 text-center space-y-2 transition duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FaRegImage className="text-4xl text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag image(s) here or{" "}
              <p
                className="text-blue-600 underline cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                Browse images
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </p>

            {/* Preview */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 border rounded overflow-hidden shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sales & Purchase Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Sales Information */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="salesInfo"
              checked={salesEnabled}
              onChange={() => setSalesEnabled(!salesEnabled)}
            />
            <label
              htmlFor="salesInfo"
              className="text-sm font-medium text-gray-700"
            >
              Sales Information
            </label>
          </div>

          {salesEnabled && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price <span className="text-red-600">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-700">
                    INR
                  </span>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-r-md p-2"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account <span className="text-red-600">*</span>
                </label>
                <select
                  name="salesAccount"
                  value={formData.salesAccount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Sales">Sales</option>
                  <option value="Other Income">Other Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="salesDescription"
                  value={formData.salesDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Purchase Information */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="purchase"
              checked={purchaseEnabled}
              onChange={() => setPurchaseEnabled(!purchaseEnabled)}
            />
            <label
              htmlFor="purchase"
              className="text-sm font-medium text-gray-700"
            >
              Purchase Information
            </label>
          </div>

          {purchaseEnabled && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Price <span className="text-red-600">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-700">
                    INR
                  </span>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-r-md p-2"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account <span className="text-red-600">*</span>
                </label>
                <select
                  name="purchaseAccount"
                  value={formData.purchaseAccount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                  <option value="Expenses">Expenses</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="purchaseDescription"
                  value={formData.purchaseDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Vendor
                </label>
                <select
                  name="preferredVendor"
                  value={formData.preferredVendor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Vendor</option>
                  <option value="Vendor A">Vendor A</option>
                  <option value="Vendor B">Vendor B</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Inventory Tracking */}
      <div className="bg-gray-50 px-6 py-6 rounded-lg mt-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="trackInventory"
            name="trackInventory"
            checked={formData.trackInventory}
            onChange={handleChange}
          />
          <label
            htmlFor="trackInventory"
            className="text-sm text-gray-700 font-medium"
          >
            Track Inventory for this item
          </label>
          <span className="text-xs text-gray-400">
            (You cannot enable/disable inventory tracking once you've created
            transactions for this item)
          </span>
        </div>

        {/* Inventory Details: Only if sales & purchase are enabled */}
        {formData.trackInventory && salesEnabled && purchaseEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Inventory Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inventory Account <span className="text-red-600">*</span>
              </label>
              <select
                name="inventoryAccount"
                value={formData.inventoryAccount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select an account</option>
                <option value="Inventory Asset">Inventory Asset</option>
                <option value="Stock on Hand">Stock on Hand</option>
              </select>
            </div>

            {/* Inventory Valuation Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inventory Valuation Method{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="valuationMethod"
                value={formData.valuationMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select the valuation method</option>
                <option value="FIFO">FIFO</option>
                <option value="LIFO">LIFO</option>
                <option value="Average Cost">Average Cost</option>
              </select>
            </div>

            {/* Opening Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Stock
              </label>
              <input
                type="number"
                name="openingStock"
                value={formData.openingStock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Opening Stock Rate per Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Stock Rate per Unit
              </label>
              <input
                type="number"
                name="openingStockRate"
                value={formData.openingStockRate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Reorder Point */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Point
              </label>
              <input
                type="number"
                name="reorderPoint"
                value={formData.reorderPoint}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
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

export default NewItemForm;
