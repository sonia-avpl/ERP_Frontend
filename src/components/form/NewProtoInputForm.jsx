import { useState } from "react";

const NewProtoInputForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    type: "",
    designedBy: "",
    lastUpdate: "",
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
    components: "",
    flightDuration: "",
    maxFlightDistance: "",
    observation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section>
      <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            New Prototype
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            {/* version */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Version</label>
              <input
                name="version"
                value={formData.version}
                onChange={handleChange}
                placeholder="version"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Type</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="type"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* designed by */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Desined By
              </label>
              <input
                name="designedBy"
                value={formData.designedBy}
                onChange={handleChange}
                placeholder="designed by"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            {/* last update */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Last Update
              </label>
              <input
                name="lastUpdate"
                value={formData.lastUpdate}
                onChange={handleChange}
                placeholder="last update"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* physical properties */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Physical Properties
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="dimension"
                  value={formData.dimension}
                  onChange={handleChange}
                  placeholder="dimension"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="weight"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="material"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="mounting"
                  value={formData.mounting}
                  onChange={handleChange}
                  placeholder="mounting"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="color"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* electrical properties */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Electrical Properties
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="voltageRange"
                  value={formData.voltageRange}
                  onChange={handleChange}
                  placeholder="voltageRange"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="currentDraw"
                  value={formData.currentDraw}
                  onChange={handleChange}
                  placeholder="currentDraw"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  placeholder="processor"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="imu"
                  value={formData.imu}
                  onChange={handleChange}
                  placeholder="imu"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="barometer"
                  value={formData.barometer}
                  onChange={handleChange}
                  placeholder="barometer"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* connectivity */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Connectivity
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="uartPorts"
                  value={formData.uartPorts}
                  onChange={handleChange}
                  placeholder="UART Ports"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="i2cPorts"
                  value={formData.i2cPorts}
                  onChange={handleChange}
                  placeholder="I2C Ports"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="usb"
                  value={formData.usb}
                  onChange={handleChange}
                  placeholder="USB"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="bluetooth"
                  value={formData.bluetooth}
                  onChange={handleChange}
                  placeholder="Bluetooth"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="osd"
                  value={formData.osd}
                  onChange={handleChange}
                  placeholder="OSD"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* components */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Components
              </label>
              <input
                name="components"
                value={formData.components}
                onChange={handleChange}
                placeholder="components"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* test result */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Test Result
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="flightDuration"
                  value={formData.flightDuration}
                  onChange={handleChange}
                  placeholder="flightDuration"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="maxFlightDistance"
                  value={formData.maxFlightDistance}
                  onChange={handleChange}
                  placeholder="maxFlightDistance"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                  name="observation"
                  value={formData.observation}
                  onChange={handleChange}
                  placeholder="observation"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                Submit Prototype
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default NewProtoInputForm;
