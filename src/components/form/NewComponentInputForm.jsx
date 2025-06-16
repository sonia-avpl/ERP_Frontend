import { useEffect, useState } from "react";
import { baseUrl } from "../../utilis";

const NewComponentInputForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    useCase: "",
    dimension: "",
    weight: "",
    material: "",
    mounting: "",
    color: "",
    voltageRange: "",
    currentDraw: "",
    processor: "",
    imu: "",
    barometer: "",
    uartPorts: "",
    i2cPorts: "",
    usb: "",
    bluetooth: "",
    osd: "",
  });
  const [categories, setCategories] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      const data = await res.json();
      console.log("Success:", data);
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting form.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories`);
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const componentType = [
    "Flight Controll",
    "Motor",
    "ESC",
    "Propeller",
    "Battery",
    "Camera",
    "Frame",
    "GPS Module",
    "Receiver",
    "Transmitter",
    "Gimbal",
    "Power Distribution Board",
    "Antenna",
    "Sensor",
    "Telementry Module",
  ];

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          New Component
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Upload Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Picture</label>
            <input
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            />
          </div>

          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., CUAV V5+ Autopilot"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Component Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Component Type
            </label>
            <select
              name="componentType"
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="componentType">Select Component</option>
              {componentType.map((component, id) => (
                <option key={id} value={component}>
                  {component}
                </option>
              ))}
            </select>
          </div>

          {/* Physical properties */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Physical Properties
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="dimension"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dimension"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="weight"
                value={formData.name}
                onChange={handleChange}
                placeholder="Weight"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="material"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mateiral"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="mounting"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="color"
                value={formData.name}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* electricalProperties */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Electrical Properties
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="voltageRange"
                value={formData.name}
                onChange={handleChange}
                placeholder="Voltage Range"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="currentDraw"
                value={formData.name}
                onChange={handleChange}
                placeholder="Current Drawan"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="processor"
                value={formData.name}
                onChange={handleChange}
                placeholder="Processor"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="imu"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="barometer"
                value={formData.name}
                onChange={handleChange}
                placeholder="Barometer"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* connectivity */}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Connectivity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="uartPorts"
                value={formData.name}
                onChange={handleChange}
                placeholder="Uart Ports"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="i2cPorts"
                value={formData.name}
                onChange={handleChange}
                placeholder="i2cPorts"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="usb"
                value={formData.name}
                onChange={handleChange}
                placeholder="usb"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="bluetooth"
                value={formData.name}
                onChange={handleChange}
                placeholder="bluetooth"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="osd"
                value={formData.name}
                onChange={handleChange}
                placeholder="osd"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* versions */}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Versions</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="versionNumber"
                value={formData.name}
                onChange={handleChange}
                placeholder="Version Number"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="releaseDate"
                value={formData.name}
                onChange={handleChange}
                placeholder="Release Date"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="changes"
                value={formData.name}
                onChange={handleChange}
                placeholder="changes"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="category">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} {/* ✅ This will work if `cat.name` exists */}
                </option>
              ))}
            </select>
          </div>

          {/* Use Case */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Use Case</label>
            <input
              type="text"
              name="useCase"
              value={formData.name}
              onChange={handleChange}
              placeholder="Use Case"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Submit Component
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewComponentInputForm;
