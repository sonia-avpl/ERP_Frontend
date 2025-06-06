import { PrinterIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

const initialItems = [
  {
    title: "CAR Section 3 - Airworthiness",
    meta: "Design meets airworthiness requirements",
    checked: true,
  },
  {
    title: "CAR Section 7 - Flight Testing",
    meta: "Flight test program completed and documented",
    checked: true,
  },
  {
    title: "CAR Section 8 - Noise Certification",
    meta: "Noise levels within prescribed limits",
    checked: false,
  },
  {
    title: "CAR Section 12 - Maintenance",
    meta: "Maintenance program and documentation",
    checked: true,
  },
  {
    title: "CAR Section 15 - Security",
    meta: "Cybersecurity and anti-tampering measures",
    checked: false,
  },
  {
    title: "CAR Section 21 - Production",
    meta: "Production quality system established",
    checked: true,
  },
];

const ComplianceChecklist = () => {
  const [items, setItems] = useState(initialItems);

  const toggleCheck = (index) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  return (
    <div className="compliance-checklist space-y-4">
      {/* Header */}
      <div className="checklist-header flex justify-between items-center">
        <h3 className="checklist-title text-xl font-semibold text-gray-800">
          Compliance Checklist
        </h3>
        <button className="btn bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800">
          <PrinterIcon className="w-5 h-5" />
          Print Checklist
        </button>
      </div>

      {/* Items */}
      <div className="checklist-items space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="checklist-item flex items-start gap-3 p-3 bg-white shadow rounded"
          >
            <div className="checklist-checkbox mt-1">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(idx)}
                className="w-4 h-4"
              />
            </div>
            <div className="checklist-content">
              <div className="checklist-item-title font-medium text-gray-900">{item.title}</div>
              <div className="checklist-meta text-sm text-gray-600">{item.meta}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist;
