import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Application Submission",
    description: "Submit formal application with required documents to DGCA",
    docs: [
      { icon: <DocumentTextIcon className="w-4 h-4" />, name: "Form DGCA-101" },
      { icon: <DocumentDuplicateIcon className="w-4 h-4" />, name: "Company Profile" },
    ],
    status: "Completed",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    number: 2,
    title: "Documentation Review",
    description: "DGCA reviews technical documentation for completeness",
    docs: [
      { icon: <ClipboardDocumentListIcon className="w-4 h-4" />, name: "Design Documents" },
      { icon: <DocumentCheckIcon className="w-4 h-4" />, name: "Safety Analysis" },
    ],
    status: "In Review",
    statusClass: "bg-yellow-100 text-yellow-700",
  },
  {
    number: 3,
    title: "Ground & Flight Tests",
    description: "Witnessed testing of drone systems and performance",
    docs: [
      { icon: <ClipboardDocumentListIcon className="w-4 h-4" />, name: "Test Plans" },
      { icon: <DocumentCheckIcon className="w-4 h-4" />, name: "Test Reports" },
    ],
    status: "Scheduled",
    statusClass: "bg-yellow-100 text-yellow-700",
  },
  {
    number: 4,
    title: "Compliance Verification",
    description: "DGCA verifies compliance with CAR regulations",
    docs: [
      { icon: <DocumentTextIcon className="w-4 h-4" />, name: "Compliance Matrix" },
      { icon: <PencilSquareIcon className="w-4 h-4" />, name: "Declaration" },
    ],
    status: "Pending",
    statusClass: "bg-gray-200 text-gray-700",
  },
  {
    number: 5,
    title: "Certification Issuance",
    description: "Type Certificate issued upon successful completion",
    docs: [
      { icon: <TrophyIcon className="w-4 h-4" />, name: "Type Certificate" },
    ],
    status: "Pending",
    statusClass: "bg-gray-200 text-gray-700",
  },
];

const DGCAProcess = () => {
  return (
    <div className="dgca-process space-y-6 bg-white p-4 my-5">
      {/* Header */}
      <div className="process-header flex justify-between items-center">
        <h3 className="process-title text-xl font-semibold text-gray-800">
          DGCA Type Certification Process
        </h3>
        <button className="btn bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700">
          <ArrowDownTrayIcon className="w-5 h-5" />
          Process Guide
        </button>
      </div>

      {/* Steps */}
      <div className="process-steps space-y-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="process-step bg-blue-50 shadow p-4 rounded flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="step-number text-2xl font-bold text-blue-600">{step.number}</div>
            <div className="step-content flex-1 space-y-1">
              <div className="step-title font-semibold text-gray-800">{step.title}</div>
              <p className="text-sm text-gray-600">{step.description}</p>
              <div className="step-docs flex flex-wrap gap-2 mt-2">
                {step.docs.map((doc, i) => (
                  <span
                    key={i}
                    className="doc-badge bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    {doc.icon}
                    {doc.name}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`step-status text-sm font-medium px-3 py-1 rounded ${step.statusClass}`}
            >
              {step.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DGCAProcess;
