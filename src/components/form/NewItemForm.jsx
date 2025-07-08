import { X } from "lucide-react";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { usePost } from "../../hooks/usePost";
import { usePostFile } from "../../hooks/usePostFile";
import { FileModules } from "../../utills/enum";
import { useGet } from "../../hooks/useGet";
import { usePatch } from "../../hooks/usePatch";

const NewItemForm = ({ onClose, mode = "create", existingData = null }) => {
  const { uploadImageOnSWithModule } = usePost();
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    sku: existingData?.sku || "",
    unit: existingData?.unit || "",
    images: existingData?.images || [],
    salesInformation: {
      sellingPrice: existingData?.salesInformation?.sellingPrice || 0,
      location: existingData?.salesInformation?.location || "",
    },
    purchaseInformation: {
      purchasePrice: existingData?.purchaseInformation?.purchasePrice || 0,
      location: existingData?.purchaseInformation?.location || "",
      preferredVendor: existingData?.purchaseInformation?.preferredVendor || "",
    },
    createdBy: "",
    trackInventory: {
      inventoryAccount: existingData?.trackInventory?.inventoryAccount || "",
      inventoryValidationMethod:
        existingData?.trackInventory?.inventoryValidationMethod || "",
      openingStock: existingData?.trackInventory?.openingStock || 0,
      openingStockRatePerUnit:
        existingData?.trackInventory?.openingStockRatePerUnit || 0,
      reorderPoint: existingData?.trackInventory?.reorderPoint || 0,
    },
  });
  const [dragActive, setDragActive] = useState(false);
  const [salesEnabled, setSalesEnabled] = useState(true);
  const [purchaseEnabled, setPurchaseEnabled] = useState(true);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const { data: vendorRes } = useGet("/vendors");
  const vendors = vendorRes?.data || [];
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

  // console.log("Post data ", postData);

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

  //  handle remove image
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
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      const payload = {
        ...formData,
        createdBy: userId,
      };
      console.log("Payload : ", payload);

      const file = formData.images;

      if (existingData) {
        let res = await patchData(`inventory/${existingData._id}`, payload);
        if (file) {
          await uploadImageOnSWithModule(
            file,
            res?._id,
            FileModules?.Inventory
          );
        }
      } else {
        const result = await postData("inventory/add", payload);
        if (!result) {
          console.log("Form submission failed.");
          return;
        }
        if (file?.length) {
          await uploadImageOnSWithModule(
            file,
            result?.data?._id,
            FileModules?.Inventory
          );
        }
      }
      setFormData({
        name: "",
        sku: "",
        unit: "",
        images: [],
        salesInformation: {
          sellingPrice: 0,
          location: "",
        },
        purchaseInformation: {
          purchasePrice: 0,
          location: "",
          preferredVendor: "",
        },
        createdBy: "",
        trackInventory: {
          inventoryAccount: "",
          inventoryValidationMethod: "",
          openingStock: 0,
          openingStockRatePerUnit: 0,
          reorderPoint: 0,
        },
      });

      onClose();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-5xl h-[90vh] overflow-hidden rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">New Item</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 transition" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Form */}
            <div className="space-y-4">
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
                  onChange={handleChange}
                  value={formData.unit}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Unit</option>
                  {["box", "packet", "meter", "roll", "pair", "ltr", "nos"].map(
                    (u, i) => (
                      <option key={i}>{u}</option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Right: Image Upload */}
            <div
              className={`h-3/4 my-auto flex flex-col items-center justify-center border-2 ${
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
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => inputRef.current.click()}
                >
                  Browse images
                </span>
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
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
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

          {/* Sales & Purchase Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="salesInfo"
                  checked={salesEnabled}
                  onChange={() => setSalesEnabled(!salesEnabled)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="salesInfo"
                  className="text-sm font-medium text-gray-700"
                >
                  Sales Information
                </label>
              </div>
              {salesEnabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price <span className="text-red-600">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-700">
                        INR
                      </span>
                      <input
                        type="number"
                        name="salesInformation.sellingPrice"
                        value={formData.salesInformation.sellingPrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-r-md p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <textarea
                      name="salesInformation.location"
                      value={formData.salesInformation.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Purchase */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="purchase"
                  checked={purchaseEnabled}
                  onChange={() => setPurchaseEnabled(!purchaseEnabled)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="purchase"
                  className="text-sm font-medium text-gray-700"
                >
                  Purchase Information
                </label>
              </div>
              {purchaseEnabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost Price <span className="text-red-600">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-700">
                        INR
                      </span>
                      <input
                        type="number"
                        name="purchaseInformation.purchasePrice"
                        value={formData.purchaseInformation.purchasePrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-r-md p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <textarea
                      name="purchaseInformation.location"
                      value={formData.purchaseInformation.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Vendor
                    </label>
                    <select
                      name="purchaseInformation.preferredVendor"
                      value={formData.purchaseInformation.preferredVendor}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Vendor</option>
                      {vendors?.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v?.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="trackInventory"
                name="trackInventory"
                checked={formData.trackInventory}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="trackInventory"
                className="text-sm font-medium text-gray-700"
              >
                Track Inventory for this item
              </label>
            </div>

            {formData.trackInventory && salesEnabled && purchaseEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Account <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="trackInventory.inventoryAccount"
                    value={formData.trackInventory.inventoryAccount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select Inventory Account</option>
                    {["stock on hand", "inventory asset"].map((inv, index) => (
                      <option key={index}>{inv}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Valuation Method{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="trackInventory.inventoryValidationMethod"
                    value={formData.trackInventory.inventoryValidationMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select Inventory Validation</option>
                    {["FIFO", "LIFO", "average cost"].map((val, index) => (
                      <option key={index}>{val}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opening Stock
                  </label>
                  <input
                    name="trackInventory.openingStock"
                    type="number"
                    value={formData.trackInventory.openingStock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opening Stock Rate per Unit
                  </label>
                  <input
                    name="trackInventory.openingStockRatePerUnit"
                    type="number"
                    value={formData.trackInventory.openingStockRatePerUnit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Point
                  </label>
                  <input
                    name="trackInventory.reorderPoint"
                    type="number"
                    value={formData.trackInventory.reorderPoint}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            {mode === "edit" ? "Update Item" : "Save Item"}
          </button>
          {(postLoading || patchLoading) && (
            <p className="text-blue-500 mt-1">Processing...</p>
          )}
          {(postError || patchError) && (
            <p className="text-red-600 mt-1">
              Error: {postError?.message || patchError?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItemForm;
