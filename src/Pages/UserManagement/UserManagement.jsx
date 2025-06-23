import { useState, useEffect } from "react";
import UserForm from "../../components/modals/UserForm";
import UserList from "../../components/list/UserList";
import { departments, role } from "../../utills/enum";
import { useGet } from "../../hooks/useGet";
import { toggleUserStatus } from "../../hooks/toggleUserStatus";
import toast from "react-hot-toast";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import LoadinSpinner from "../../components/common/LoadinSpinner";

const ITEMS_PER_PAGE = 5;

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyDisabled, setShowOnlyDisabled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, refetch } = useGet(`auth/users`);
  const Allusers = data?.users || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleAddNewUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const onToggleStatus = async (userId, isApproved) => {
    const result = await toggleUserStatus(userId, isApproved);
    if (result.success) {
      toast.success(`User ${isApproved ? "enabled" : "disabled"} successfully`);
      refetch();
    } else {
      toast.error(result.message || "Failed to update user status");
    }
  };

  const filteredUsers = Allusers.filter((user) => {
    const matchesDept =
      selectedDepartment === "All" || user.department === selectedDepartment;
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showOnlyDisabled ? !user.isApproved : true;

    return matchesDept && matchesRole && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filters UI
  const filtersUI = (
    <>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center justify-between gap-2 flex-wrap flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search by name or email"
            className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            title="Toggle filters"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div>
          <button
            onClick={handleAddNewUser}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow hover:scale-105 transition"
          >
            Add New User
          </button>
        </div>
      </div>

 <AnimatePresence>
  {showFilters && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="overflow-hidden mb-4 bg-white p-3 rounded-md shadow-sm"
    >
      <div className="flex gap-4 flex-wrap text-xs">
        <div className="flex items-center space-x-2">
          <label htmlFor="departmentFilter" className="text-gray-700">
            Department:
          </label>
          <select
            id="departmentFilter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="roleFilter" className="text-gray-700">
            Role:
          </label>
          <select
            id="roleFilter"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md"
          >
            {role.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showOnlyDisabled}
            onChange={(e) => setShowOnlyDisabled(e.target.checked)}
            className="h-4 w-4"
          />
          Disabled only
        </label>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );

if (loading) {
  return <LoadinSpinner text="Loading users..." />;
}

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans w-full">
      <UserList
        users={paginatedUsers}
        onEditUser={handleEditUser}
        onToggleStatus={onToggleStatus}
        filtersUI={filtersUI}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showForm && (
        <UserForm
          initialUser={editingUser}
          onCancel={handleCancelForm}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UserManagement;
