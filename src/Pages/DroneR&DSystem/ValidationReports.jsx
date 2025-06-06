import { Battery100Icon, BoltIcon, ChartBarIcon, PlusIcon, SignalIcon } from "@heroicons/react/24/outline";


const ValidationReports = () => {
  const reports = [
    {
      title: "Flight Stability Report",
      date: "Jun 12, 2023",
      author: "John Dronewell",
      icon: <BoltIcon className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Thermal Imaging Analysis",
      date: "Jun 10, 2023",
      author: "Sarah Lee",
      icon: <ChartBarIcon className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Battery Performance",
      date: "Jun 8, 2023",
      author: "Michael Tan",
      icon: <Battery100Icon className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Navigation System Validation",
      date: "Jun 5, 2023",
      author: "Emma Rodriguez",
      icon: <SignalIcon className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="validation-reports p-4 bg-white shadow rounded">
      <div className="section-header flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Validation Reports</h3>
        <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded text-sm font-medium">
          <PlusIcon className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="reports-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="report-card bg-gray-50 border border-gray-200 p-4 rounded hover:shadow"
          >
            <div className="report-icon mb-2">{report.icon}</div>
            <div className="report-title font-semibold text-gray-800 mb-1">{report.title}</div>
            <div className="report-meta text-sm text-gray-600">Generated: {report.date}</div>
            <div className="report-meta text-sm text-gray-600">By: {report.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidationReports;
