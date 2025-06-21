import {
  FaClipboardCheck,
  FaCheckCircle,
  FaFileAlt,
  FaTruck,
  FaCheck,
} from "react-icons/fa";

const steps = [
  {
    label: "Requisition",
    status: "Completed",
    icon: <FaClipboardCheck className="h-6 w-6" />,
  },
  {
    label: "Approval",
    status: "Completed",
    icon: <FaCheckCircle className="h-6 w-6" />,
  },
  {
    label: "PO Creation",
    status: "In Progress",
    icon: <FaFileAlt className="h-6 w-6" />,
  },
  {
    label: "Delivery",
    status: "Pending",
    icon: <FaTruck className="h-6 w-6 text-black" />,
  },
  {
    label: "Completion",
    status: "Pending",
    icon: <FaCheck className="h-6 w-6 text-black" />,
  },
];

const statusStyles = {
  Completed: {
    bg: "bg-green-500",
    text: "text-green-500",
    iconBg: "bg-green-100",
  },
  "In Progress": {
    bg: "bg-blue-500",
    text: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  Pending: {
    bg: "bg-gray-300 border",
    text: "text-gray-400",
    iconBg: "bg-white border",
  },
};

const ProcurementWorkflow = () => {
  return (
    <div className="max-w-full bg-white rounded-xl shadow p-6 mx-auto cursor-pointer">
      <h3 className="text-lg font-semibold mb-6">Procurement Workflow</h3>
      <div className="flex justify-center items-center space-x-2">
        {steps.map((step, index) => {
          const currentStyle =
            statusStyles[step.status] || statusStyles["Pending"];
          return (
            <div
              key={index}
              className="p-4 flex-1 flex flex-col items-start group relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
              )}

              {/* Icon Circle */}
              <div
                className={`relative z-10 w-16 h-16 ${currentStyle.bg} text-white rounded-full flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 shadow-md`}
              >
                {step.icon}
              </div>

              {/* Label */}
              <div className="text-center mt-3">
                <p className="text-sm font-semibold text-gray-700">
                  {step.label}
                </p>
                <p className={`text-xs ${currentStyle.text}`}>{step.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcurementWorkflow;
