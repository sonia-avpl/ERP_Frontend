import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import NewComponentInputForm from "../../modals/r&d/NewComponentInputForm";
import { useState } from "react";

const ComponentView = ({ data, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState(null);
  console.log("Da", data);
  const GeneralLnformation = [
    { label: "Component ID", value: data.componentID },
    { label: "Status", value: data.status },
    { label: "Category", value: data.category?.name || "N/A" },
    { label: "Version", value: data.version },
    { label: "Designed By", value: data.designedBy.name },

    {
      label: "Last Updated",
      value: new Date(data.lastUpdated).toLocaleString(),
    },
  ];
  const PhysicalProperties = [
    { label: "Dimensions", value: data.physicalProperties.dimensions },
    { label: "Color", value: data.physicalProperties.color },
    { label: "Material", value: data.physicalProperties.material },
    { label: "Mounting", value: data.physicalProperties.mounting },
    { label: "Weight", value: data.physicalProperties.weight },
  ];
  const ElectricalProperties = [
    { label: "Barometer", value: data.electricalProperties.barometer },
    { label: "Current Draw", value: data.electricalProperties.currentDraw },
    { label: "imu", value: data.electricalProperties.imu },
    { label: "Processor", value: data.electricalProperties.processor },
    { label: "Votage Range", value: data.electricalProperties.voltageRange },
  ];
  const Connectivity = [
    { label: "Bluetooth", value: data.connectivity.bluetooth },
    { label: "i2c Ports", value: data.connectivity.i2cPorts },
    { label: "OSD", value: data.connectivity.osd },
    { label: "UART Ports", value: data.connectivity.uartPorts },
    { label: "USB", value: data.connectivity.usb },
  ];
  return (
    <div className="component-container grid lg:grid-cols-2 gap-6 py-5 lg:h-[80vh]">
      {/* CAD Design Panel */}
      <div className="design-panel bg-white rounded shadow p-4 flex flex-col h-full">
        <div className="panel-header flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">3D Design Preview</div>
          <button className="btn btn-secondary flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300">
            <ArrowPathIcon className="w-5 h-5" /> Refresh
          </button>
        </div>

        <div className="cad-preview flex justify-center items-center h-64 bg-gray-100 rounded mb-4">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="max-h-full object-contain"
          />
        </div>

        <div className="cad-tools flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="cad-tool">🔄 Rotate</div>
          <div className="cad-tool">↔️ Pan</div>
          <div className="cad-tool">🔍 Zoom</div>
          <div className="cad-tool">📏 Measure</div>
          <div className="cad-tool">🧊 Explode View</div>
        </div>
      </div>

      {/* Specifications Panel */}
      <div className="specs-panel bg-white rounded shadow p-4 flex flex-col overflow-y-auto h-full">
        <div className="panel-header flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Component Specifications</div>
          <button
            className="btn btn-secondary flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300 text-xs"
            onClick={() => {
              setMode("edit");
              setFormData(data);
              setShowForm(true);
            }}
          >
            <PencilSquareIcon className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="tabs flex flex-wrap gap-2 mb-4 text-sm">
          <div className="tab px-3 py-1 bg-blue-100 text-blue-700 rounded cursor-pointer">
            Technical Specs
          </div>
        </div>

        <div className="specs-grid grid md:grid-cols-2 gap-4">
          <SpecCard title="General Information" specs={GeneralLnformation} />
          <SpecCard title="Physical Properties" specs={PhysicalProperties} />
          <SpecCard
            title="Electrical Properties"
            specs={ElectricalProperties}
          />{" "}
          <SpecCard title="Connectivity" specs={Connectivity} />
        </div>
      </div>
      {showForm && (
        <NewComponentInputForm
          mode={mode}
          initialData={formData}
          onClose={() => setShowForm(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

const SpecCard = ({ title, specs }) => (
  <div className="spec-card bg-gray-50 p-4 rounded">
    <h4 className="font-medium mb-2">{title}</h4>
    {specs.map(({ label, value }) => (
      <SpecItem key={label} label={label} value={value} />
    ))}
  </div>
);

const SpecItem = ({ label, value }) => (
  <div className="spec-item flex justify-between py-1 text-sm">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default ComponentView;
