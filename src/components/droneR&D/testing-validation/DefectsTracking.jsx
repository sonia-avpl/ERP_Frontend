import { PlusIcon } from "@heroicons/react/24/solid";

const DefectsTracking = () => {
  const defects = [
    {
      id: "DFCT-128",
      description: "Thermal camera loses calibration below 5°C",
      component: "Imaging System",
      priority: "High",
      status: "Open",
      assignedTo: "John D.",
    },
    {
      id: "DFCT-127",
      description: "Instability during sudden wind gusts",
      component: "Flight Controller",
      priority: "High",
      status: "In Progress",
      assignedTo: "Sarah L.",
    },
    {
      id: "DFCT-125",
      description: "Battery indicator inaccuracy at low temps",
      component: "Power System",
      priority: "Medium",
      status: "Resolved",
      assignedTo: "Michael T.",
    },
    {
      id: "DFCT-123",
      description: "GPS signal loss during high-speed maneuvers",
      component: "Navigation",
      priority: "Medium",
      status: "Open",
      assignedTo: "Emma R.",
    },
  ];

  const priorityColor = {
    High: "text-red-600 font-semibold",
    Medium: "text-yellow-600 font-semibold",
  };

  const statusColor = {
    Open: "text-blue-600 font-semibold",
    "In Progress": "text-yellow-600 font-semibold",
    Resolved: "text-green-600 font-semibold",
  };

  return (
    <div className="defects-tracking p-4 bg-white shadow rounded">
      <div className="section-header flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Defects Tracking</h3>
        <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded text-sm font-medium">
          <PlusIcon className="w-4 h-4" />
          New Defect
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="px-3 py-2 border-b">ID</th>
              <th className="px-3 py-2 border-b">Description</th>
              <th className="px-3 py-2 border-b">Component</th>
              <th className="px-3 py-2 border-b">Priority</th>
              <th className="px-3 py-2 border-b">Status</th>
              <th className="px-3 py-2 border-b">Assigned To</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {defects.map((defect) => (
              <tr key={defect.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b">{defect.id}</td>
                <td className="px-3 py-2 border-b">{defect.description}</td>
                <td className="px-3 py-2 border-b">{defect.component}</td>
                <td className={`px-3 py-2 border-b ${priorityColor[defect.priority]}`}>
                  {defect.priority}
                </td>
                <td className={`px-3 py-2 border-b ${statusColor[defect.status]}`}>
                  {defect.status}
                </td>
                <td className="px-3 py-2 border-b">{defect.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DefectsTracking;
