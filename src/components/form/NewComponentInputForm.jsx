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
    versionNumber: "",
    releaseDate: "",
    changes: "",
    componentType: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          {/** Name */}
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

          {/** Component Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Component Type
            </label>
            <select
              name="componentType"
              value={formData.componentType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Component</option>
              {componentType.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/** Physical Properties */}
          {["dimension", "weight", "material", "mounting", "color"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )
          )}

          {/** Electrical Properties */}
          {["voltageRange", "currentDraw", "processor", "imu", "barometer"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )
          )}

          {/** Connectivity */}
          {["uartPorts", "i2cPorts", "usb", "bluetooth", "osd"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          ))}

          {/** Versions */}
          {["versionNumber", "releaseDate", "changes"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          ))}

          {/** Category Dropdown */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/** Use Case */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Use Case</label>
            <input
              type="text"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              placeholder="e.g., Long-range drone mapping"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

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
