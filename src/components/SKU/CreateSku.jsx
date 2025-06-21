import { useState } from "react";

const CreateSku = () => {
  const [form, setForm] = useState({
    skuCode: "",
    skuName: "",
    category: "",
    subCategory: "",
    uom: "Unit",
    hsnCode: "",
    description: "",
    image: null,
    reorderLevel: "",
    safetyStock: "",
    expiryDays: "",
    storageCondition: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <section className="max-w-full mx-auto p-6 bg-white rounded-xl shadow mt-10 text-sm">
      {/* Header */}
      <button className="text-lg font-semibold ">
        <span className="text-2xl font-extrabold mr-2">+</span> Create New Stock
        Keeping Unit
      </button>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            SKU Code <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="skuCode"
            required
            value={form.skuCode}
            onChange={handleChange}
            placeholder="Enter unique SKU code"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            SKU Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="skuName"
            required
            value={form.skuName}
            onChange={handleChange}
            placeholder="Enter descriptive name"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Category <span className="text-red-700">*</span>
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Select Category</option>
            <option>Electronics</option>
            <option>Consumables</option>
            <option>Stationery</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Sub-Category
          </label>
          <input
            type="text"
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            placeholder="Enter sub-category"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Unit of Measure <span className="text-red-700">*</span>
          </label>
          <select
            name="uom"
            required
            value={form.uom}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Unit</option>
            <option>Kg</option>
            <option>Litres</option>
            <option>Packets</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            HSN Code
          </label>
          <input
            type="text"
            name="hsnCode"
            value={form.hsnCode}
            onChange={handleChange}
            placeholder="Enter HSN code"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Detailed description of the SKU"
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Reorder Level <span className="text-red-700">*</span>
          </label>
          <input
            type="number"
            name="reorderLevel"
            required
            value={form.reorderLevel}
            onChange={handleChange}
            placeholder="Minimum stock level"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Safety Stock
          </label>
          <input
            type="number"
            name="safetyStock"
            value={form.safetyStock}
            onChange={handleChange}
            placeholder="Buffer stock quantity"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Expiry Days (if applicable)
          </label>
          <input
            type="number"
            name="expiryDays"
            value={form.expiryDays}
            onChange={handleChange}
            placeholder="Days until expiry"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Storage Condition
          </label>
          <select
            name="storageCondition"
            value={form.storageCondition}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Select Condition</option>
            <option>Room Temp</option>
            <option>Cool & Dry</option>
            <option>Frozen</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => setForm({})}
            className="px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
             Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
             Create SKU
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateSku;
