import { useEffect, useState } from "react";
import { baseUrl } from "../../utilis";

const NewComponentInputForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [range, setRange] = useState("");
  const [speed, setSpeed] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [useCase, setUseCase] = useState("");

  // physical properties
  const [dimension, setDimenssion] = useState();
  const [weight, setWeight] = useState();
  const [material, setMaterial] = useState();
  const [mounting, setMounting] = useState();
  const [color, setColor] = useState();

  // electrical Properties
  const [voltageRange, setVoltageRange] = useState();
  const [currentDraw, setCurrentDraw] = useState();
  const [processor, setProcessor] = useState();
  const [imu, setImu] = useState();
  const [barometer, setBarometer] = useState();

  // connectivity
  const [uartPorts, setUartPorts] = useState();
  const [i2cPorts, setI2cPorts] = useState();
  const [usb, setUsb] = useState();
  const [bluetooth, setBluetooth] = useState();
  const [osd, setOsd] = useState();


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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                value={dimension}
                onChange={(e) => setDimenssion(e.target.value)}
                placeholder="Dimension"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Mateiral"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={mounting}
                onChange={(e) => setMounting(e.target.value)}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
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
                value={voltageRange}
                onChange={(e) => setVoltageRange(e.target.value)}
                placeholder="Voltage Range"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={currentDraw}
                onChange={(e) => setCurrentDraw(e.target.value)}
                placeholder="Current Drawan"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={processor}
                onChange={(e) => setProcessor(e.target.value)}
                placeholder="Processor"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={imu}
                onChange={(e) => setImu(e.target.value)}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={barometer}
                onChange={(e) => setBarometer(e.target.value)}
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
                value={uartPorts}
                onChange={(e) => setUartPorts(e.target.value)}
                placeholder="Uart Ports"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={i2cPorts}
                onChange={(e) => setI2cPorts(e.target.value)}
                placeholder="i2cPorts"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={usb}
                onChange={(e) => setUsb(e.target.value)}
                placeholder="usb"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={bluetooth}
                onChange={(e) => setBluetooth(e.target.value)}
                placeholder="bluetooth"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={osd}
                onChange={(e) => setOsd(e.target.value)}
                placeholder="osd"
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
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} {/* ✅ This will work if `cat.name` exists */}
                </option>
              ))}
            </select>

            {/* <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Tactical Drones,"
              className="w-full border border-gray-300 rounded-lg p-2"
            /> */}
          </div>

          {/* Use Case */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Use Case</label>
            <input
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
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
