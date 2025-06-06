import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { BellSlashIcon } from "@heroicons/react/24/outline";


const reorderAlertsData = [
  {
    sku: "DRN-BATT-4S",
    name: "4S LiPo Battery 5000mAh",
    currentStock: 8,
    minRequired: 15,
  },
  {
    sku: "DRN-FC-V5",
    name: "Flight Controller V5",
    currentStock: 18,
    minRequired: 25,
  },
  {
    sku: "DRN-GPS-M8N",
    name: "GPS Module M8N",
    currentStock: 12,
    minRequired: 20,
  },
];

const ReorderAlerts = () => {
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Reorder Alerts</h3>
        <button className="btn-secondary flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded">
          <BellSlashIcon className="h-5 w-5 text-gray-600" />
          Dismiss All
        </button>
      </div>

      <div className="space-y-4">
        {reorderAlertsData.map(({ sku, name, currentStock, minRequired }) => (
          <div key={sku} className="flex items-center gap-4 bg-red-50 p-3 rounded shadow-sm">
            <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-900">{`${sku} - ${name}`}</div>
              <div className="text-sm text-red-700">{`Current stock: ${currentStock} | Min required: ${minRequired}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReorderAlerts;
