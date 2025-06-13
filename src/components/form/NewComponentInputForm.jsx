import { option } from "framer-motion/client";
import { useState } from "react";

const NewComponentInputForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [voltage, setVoltage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [range, setRange] = useState("");
  const [speed, setSpeed] = useState("");
  const [category, setCategory] = useState("");
  const [useCase, setUseCase] = useState("");

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
              {componentType.map((component, id) => (
                <option key={id} value={component}>
                  {component}
                </option>
              ))}
            </select>
          </div>

          {/* Specs Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Specifications
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="Voltage"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="Range"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                placeholder="Speed"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Tactical Drones,"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
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
