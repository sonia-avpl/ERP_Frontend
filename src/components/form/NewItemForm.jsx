import { X } from "lucide-react";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewItemForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "Goods",
    name: "",
    sku: "",
    unit: "",
    returnable: false,
    images: [],
    length: "",
    width: "",
    height: "",
    dimensionUnit: "cm",
    weight: "",
    weightUnit: "kg",
    manufacturer: "",
    brand: "",
    upc: "",
    mpn: "",
    ean: "",
    isbn: "",
  });

  const [dragActive, setDragActive] = useState(false);
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

  const handleImageUpload = (e) => {
    handleFiles(e.target.files);
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

  return (
    <section className="w-full bg-white p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">New Item</h2>
        <button onClick={() => navigate(-1)}>
          <X className="w-5 h-5" />
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
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="Goods"
                    checked={formData.type === "Goods"}
                    onChange={handleChange}
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
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Returnable Item */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="returnable"
                checked={formData.returnable}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <label className="text-sm font-medium text-gray-700">
                Returnable Item <span className="text-gray-400">(?)</span>
              </label>
            </div>
          </div>

          {/* Right Section – Image Upload */}
          {/* Right Section – Image Upload */}
          <div
            className={`flex flex-col items-center justify-center border-2 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } border-dashed rounded-md p-6 text-center space-y-2`}
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
            <p className="text-xs text-gray-400">
              You can add up to 15 images, each not exceeding 5 MB in size and
              7000 x 7000 pixels resolution.
            </p>

            {/* Preview */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 border rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dimensions & Weight Section */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-6">
        {/* Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions{" "}
            <span className="text-gray-400">(Length x Width x Height)</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="length"
              placeholder="x"
              className="w-1/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            />
            <input
              type="number"
              name="width"
              placeholder="x"
              className="w-1/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            />
            <input
              type="number"
              name="height"
              placeholder="x"
              className="w-1/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            />
            <select
              name="dimensionUnit"
              className="w-1/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            >
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="weight"
              className="w-3/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            />
            <select
              name="weightUnit"
              className="w-1/4 border border-gray-300 rounded-md p-2"
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        {/* Manufacturer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer <span className="text-gray-400">(?)</span>
          </label>
          <select
            name="manufacturer"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          >
            <option value="">Select or Add Manufacturer</option>
            <option value="Manufacturer A">Manufacturer A</option>
            <option value="Manufacturer B">Manufacturer B</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand <span className="text-gray-400">(?)</span>
          </label>
          <select
            name="brand"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          >
            <option value="">Select or Add Brand</option>
            <option value="Brand X">Brand X</option>
            <option value="Brand Y">Brand Y</option>
          </select>
        </div>

        {/* UPC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPC <span className="text-gray-400">(?)</span>
          </label>
          <input
            type="text"
            name="upc"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* MPN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MPN <span className="text-gray-400">(?)</span>
          </label>
          <input
            type="text"
            name="mpn"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* EAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            EAN <span className="text-gray-400">(?)</span>
          </label>
          <input
            type="text"
            name="ean"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ISBN <span className="text-gray-400">(?)</span>
          </label>
          <input
            type="text"
            name="isbn"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
      </div>

      
    </section>
  );
};

export default NewItemForm;
