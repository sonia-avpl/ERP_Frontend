import { useEffect, useState } from "react";
import { baseUrl } from "../../utilis";

const NewComponentInputForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    file: "",
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
    componentType: "",
    versionNumber: "",
    releaseDate: "",
    changes: "",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories`);
        const result = await response.json();
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
    "Flight Controller",
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
    "Telemetry Module",
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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* file */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Upload File
            </label>
            <input
              type="file"
              name="file"
              value={formData.file}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., CUAV V5+ Autopilot"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Component Type & Select Component*/}
          <div className="flex w-full justify-between">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Component Type
              </label>
              <select
                name="componentType"
                value={formData.componentType}
                onChange={handleChange}
                className=" border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Component</option>
                {componentType.map((component, id) => (
                  <option key={id} value={component}>
                    {component}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
                className=" border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Physical Properties */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Physical Properties
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="dimension"
                value={formData.dimension}
                onChange={handleChange}
                placeholder="Dimension"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Material"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="mounting"
                value={formData.mounting}
                onChange={handleChange}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Electrical Properties */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Electrical Properties
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="voltageRange"
                value={formData.voltageRange}
                onChange={handleChange}
                placeholder="Voltage Range"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="currentDraw"
                value={formData.currentDraw}
                onChange={handleChange}
                placeholder="Current Draw"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="processor"
                value={formData.processor}
                onChange={handleChange}
                placeholder="Processor"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="imu"
                value={formData.imu}
                onChange={handleChange}
                placeholder="IMU"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="barometer"
                value={formData.barometer}
                onChange={handleChange}
                placeholder="Barometer"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Connectivity */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Connectivity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="uartPorts"
                value={formData.uartPorts}
                onChange={handleChange}
                placeholder="UART Ports"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="i2cPorts"
                value={formData.i2cPorts}
                onChange={handleChange}
                placeholder="I2C Ports"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="usb"
                value={formData.usb}
                onChange={handleChange}
                placeholder="USB"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="bluetooth"
                value={formData.bluetooth}
                onChange={handleChange}
                placeholder="Bluetooth"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="osd"
                value={formData.osd}
                onChange={handleChange}
                placeholder="OSD"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Versions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Versions</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="versionNumber"
                value={formData.versionNumber}
                onChange={handleChange}
                placeholder="Version Number"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                placeholder="Release Date"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="changes"
                value={formData.changes}
                onChange={handleChange}
                placeholder="Changes"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Category */}

          {/* Use Case */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Use Case</label>
            <textarea
              type="text"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
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
