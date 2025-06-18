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
import { useState } from "react";

const steps = [
  {
    title: "Application Submission",
    description: "Submit formal application with required documents to DGCA",
    docs: [
      { icon: <DocumentTextIcon className="w-4 h-4" />, name: "Form DGCA-101" },
      { icon: <DocumentDuplicateIcon className="w-4 h-4" />, name: "Company Profile" },
    ],
    status: "Completed",
    statusClass: "bg-green-100 text-green-700 border-green-400",
  },
  {
    title: "Documentation Review",
    description: "DGCA reviews technical documentation for completeness",
    docs: [
      { icon: <ClipboardDocumentListIcon className="w-4 h-4" />, name: "Design Documents" },
      { icon: <DocumentCheckIcon className="w-4 h-4" />, name: "Safety Analysis" },
    ],
    status: "In Review",
    statusClass: "bg-yellow-100 text-yellow-700 border-yellow-400",
  },
  {
    title: "Ground & Flight Tests",
    description: "Witnessed testing of drone systems and performance",
    docs: [
      { icon: <ClipboardDocumentListIcon className="w-4 h-4" />, name: "Test Plans" },
      { icon: <DocumentCheckIcon className="w-4 h-4" />, name: "Test Reports" },
    ],
    status: "Scheduled",
    statusClass: "bg-blue-100 text-blue-700 border-blue-400",
  },
  {
    title: "Compliance Verification",
    description: "DGCA verifies compliance with CAR regulations",
    docs: [
      { icon: <DocumentTextIcon className="w-4 h-4" />, name: "Compliance Matrix" },
      { icon: <PencilSquareIcon className="w-4 h-4" />, name: "Declaration" },
    ],
    status: "Pending",
    statusClass: "bg-gray-100 text-gray-700 border-gray-300",
  },
  {
    title: "Certification Issuance",
    description: "Type Certificate issued upon successful completion",
    docs: [
      { icon: <TrophyIcon className="w-4 h-4" />, name: "Type Certificate" },
    ],
    status: "Pending",
    statusClass: "bg-gray-100 text-gray-700 border-gray-300",
  },
];

const DGCAProcess = () => {
  const currentStepIndex = steps.findIndex((step) => step.status !== "Completed");

  return (
    <div className="space-y-6 bg-white p-6 my-6 rounded-xl">
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

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Horizontal Steps */}
      <div className="process-steps flex flex-col md:flex-row md:justify-between gap-6 mt-6 overflow-x-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative flex-1 min-w-[220px] bg-white rounded-lg border p-4 transition hover:shadow-md ${step.statusClass}`}
          >
            <div className="step-content space-y-2">
              <h4 className="font-semibold text-base text-gray-800">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600">{step.description}</p>
              <div className="step-docs flex flex-col gap-1 mt-2">
                {step.docs.map((doc, i) => (
                  <span
                    key={i}
                    className="doc-badge bg-white border text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    {doc.icon}
                    {doc.name}
                  </span>
                ))}
              </div>
              <span
                className={`text-xs font-medium inline-block mt-2 px-3 py-1 rounded ${step.statusClass}`}
              >
                {step.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DGCAProcess;
