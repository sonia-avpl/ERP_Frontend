import {
  ExclamationCircleIcon,
  BellSlashIcon,
} from "@heroicons/react/24/outline";
import { useGet } from "../../../hooks/useGet";


const ReorderAlerts = () => {
  const { data: alert } = useGet(`inventory/alerts`);
  console.log("alert", alert);

  return (
    <div className="bg-white rounded shadow p-6 my-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Reorder Alerts</h3>
        <button className="btn-secondary flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded">
          <BellSlashIcon className="h-5 w-5 text-gray-600" />
          Dismiss All
        </button>
      </div>

      <div className="space-y-4">
        {(alert || []).map(({ sku, itemName, currentStock, minStock }) => (
          <div
            key={sku}
            className="flex items-center gap-4 bg-red-50 p-3 rounded shadow-sm"
          >
            <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-900">{`${sku} - ${itemName}`}</div>
              <div className="text-sm text-red-700">{`Current stock: ${currentStock} | Min required: ${minStock}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReorderAlerts;
