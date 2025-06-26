import { CheckCircle, XCircle, Eye, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FeeCollectionModal from "../modals/principal/FeeCollectionModal";
import { useGet } from "../../hooks/useGet";

const StudentList = ({
  loading,
  admissionList,
  filtersUI,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
 
  return (
    <motion.div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="mb-4 transition-all duration-300 ease-in-out">
        {filtersUI}
      </div>
      <AnimatePresence mode="wait">
        <motion.table
          key={admissionList?.length}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-w-full divide-y divide-gray-200"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "Registration No.",
                    "Student Name",
                    "Fee Status",
                    "Total Fees",
                    "Submitted Amount",
                    "Bank Submitted",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array(5)
                        .fill()
                        .map((_, j) => (
                          <td key={j} className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              ) : admissionList?.length === 0 ? (
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-600 text-lg"
                    >
                      No admissions to display.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-200">
                  {admissionList.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-800">
                        {student.registrationNo}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {student.name}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {student.feeStatus ? (
                          <span className="flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" /> Submitted
                          </span>
                        ) : (
                          <span className="flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            <XCircle className="w-4 h-4 mr-1" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {student.totalFees}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {student.totalFees}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        Not Submitted
                      </td>
                      <td className="py-4 px-6 text-xs flex items-center gap-4 text-blue-600">
                        <button
                          onClick={() =>
                            navigate(`/student-details/${student._id}`)
                          }
                          className="hover:text-blue-800 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                        {user.role === "Principal" && (
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowFeeModal(true);
                            }}
                            className="hover:text-blue-800 flex items-center gap-1"
                          >
                            <Wallet className="w-4 h-4" /> Collect Fee
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </motion.table>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end items-center space-x-2 text-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <FeeCollectionModal
        isOpen={showFeeModal}
        onClose={() => setShowFeeModal(false)}
        student={selectedStudent}
      />
    </motion.div>
  );
};

export default StudentList;
