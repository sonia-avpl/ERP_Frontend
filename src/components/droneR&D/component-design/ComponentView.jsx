import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const ComponentView = () => {
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
          {/* Placeholder for 3D Preview */}
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
      <div className="specs-panel bg-white rounded shadow p-4 flex flex-col  overflow-y-auto h-full">
        <div className="panel-header flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Component Specifications</div>
          <button className="btn btn-secondary flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300 text-xs">
            <PencilSquareIcon className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="tabs flex flex-wrap gap-2 mb-4 text-sm">
          <div className="tab px-3 py-1 bg-blue-100 text-blue-700 rounded cursor-pointer">
            Technical Specs
          </div>
          {/* Tech Technical Specs*/}
        </div>
      </div>
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
