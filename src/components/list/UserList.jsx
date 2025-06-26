import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const UserList = ({
  users,
  onEditUser,
  onToggleStatus,
  filtersUI,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <motion.div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="mb-4">{filtersUI}</div>

      <AnimatePresence mode="wait">
        <motion.table
          key={users.length}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-50 ${
                    !user.isApproved ? "bg-gray-100 text-gray-400" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !user.isApproved
                          ? "bg-gray-200 text-gray-500"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.cryptoPassword}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center gap-3">
                    <button
                      onClick={() => onToggleStatus(user._id, !user.isApproved)}
                      className={`px-4 py-1 rounded-lg text-xs shadow transition ${
                        !user.isApproved
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      {!user.isApproved ? "Enable" : "Disable"}
                    </button>
                    <button
                      onClick={() => onEditUser(user)}
                      title="Edit Role"
                      className={
                        !user.isApproved ? "opacity-50 cursor-not-allowed" : ""
                      }
                      disabled={!user.isApproved}
                    >
                      <PencilSquareIcon className="w-5 h-5 text-blue-600 hover:text-blue-800 transition" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </motion.table>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 flex justify-end items-center space-x-2 text-sm"
        >
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
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserList;
