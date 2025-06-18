import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  BookOpenIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import GetCertificates from "../../form/GetCertificates";

const categories = [
  "All Documents",
  "Type Certification",
  "Test Reports",
  "Design Documentation",
  "Safety Analysis",
  "Operations Manuals",
  "Training Materials",
];

const documents = [
  {
    title: "Type Certificate Application",
    description: "Form DGCA-101 for drone type certification",
    version: "2.1",
    status: "Pending Review",
    statusClass: "bg-yellow-100 text-yellow-700",
    icon: <DocumentTextIcon className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Flight Test Report",
    description: "Comprehensive flight test results and analysis",
    version: "4.3",
    status: "Approved",
    statusClass: "bg-green-100 text-green-700",
    icon: <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Safety Assessment Report",
    description: "Risk analysis and mitigation strategies",
    version: "3.0",
    status: "Draft",
    statusClass: "bg-gray-200 text-gray-700",
    icon: <DocumentCheckIcon className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Operations Manual",
    description: "Standard operating procedures for drone",
    version: "1.2",
    status: "Approved",
    statusClass: "bg-green-100 text-green-700",
    icon: <BookOpenIcon className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Noise Certification",
    description: "Acoustic test results and compliance",
    version: "1.0",
    status: "Approved",
    statusClass: "bg-green-100 text-green-700",
    icon: <DocumentDuplicateIcon className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Declaration of Compliance",
    description: "Formal declaration to DGCA regulations",
    version: "1.5",
    status: "Draft",
    statusClass: "bg-gray-200 text-gray-700",
    icon: <PencilSquareIcon className="w-6 h-6 text-blue-600" />,
  },
];

const DocumentationRepo = () => {
  const [activeCategory, setActiveCategory] = useState("All Documents");
  const [getCertificate, setGetCertificate] = useState(false);

  return (
    <div className="documentation-repo space-y-6">
      {/* Header */}
      <div className="repo-header flex justify-between items-center">
        <h3 className="repo-title text-xl font-semibold text-gray-800">
          Document Repository
        </h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setGetCertificate(true)}
          className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          New Document
        </motion.button>
        {getCertificate && <GetCertificates onClose={() => setGetCertificate(false)} />}
      </div>

      {/* Categories */}
      <div className="categories flex flex-wrap gap-2 text-sm">
        {categories.map((cat) => (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.05 }}
            className={`category px-3 py-1 rounded cursor-pointer transition-all ${
              activeCategory === cat
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </motion.div>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="doc-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.title}
            className="doc-card bg-white shadow p-4 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="doc-icon mb-2">{doc.icon}</div>
            <div className="doc-title font-medium text-gray-800">
              {doc.title}
            </div>
            <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
            <div className="doc-meta flex justify-between items-center text-xs text-gray-500">
              <div>Version {doc.version}</div>
              <div
                className={`doc-status px-2 py-0.5 rounded ${doc.statusClass}`}
              >
                {doc.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DocumentationRepo;
