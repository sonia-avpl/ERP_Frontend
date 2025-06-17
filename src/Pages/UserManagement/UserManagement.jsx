import { useState, useEffect } from "react";
import UserForm from "../../components/modals/UserForm";
import UserList from "../../components/list/UserList";
const departments = [
  "Engineering",
  "Marketing",
  "HR",
  "Sales",
  "Finance",
  "Operations",
];

const mockUsersData = [
  {
    id: "usr-1",
    name: "Alice Smith",
    email: "alice@example.com",
    department: "Engineering",
    role: "Developer",
  },
  {
    id: "usr-2",
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Marketing",
    role: "Manager",
  },
  {
    id: "usr-3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    department: "Engineering",
    role: "Lead",
  },
  {
    id: "usr-4",
    name: "Diana Prince",
    email: "diana@example.com",
    department: "HR",
    role: "HR Manager",
  },
  {
    id: "usr-5",
    name: "Eve Adams",
    email: "eve@example.com",
    department: "Marketing",
    role: "Marketer",
  },
  {
    id: "usr-6",
    name: "Frank White",
    email: "frank@example.com",
    department: "Sales",
    role: "Sales Representative",
  },
  {
    id: "usr-7",
    name: "Grace Taylor",
    email: "grace@example.com",
    department: "Engineering",
    role: "Admin",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsersData);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const handleFormSubmit = (userData) => {
    if (userData.id) {
      setUsers(
        users.map((user) => (user.id === userData.id ? userData : user))
      );
    } else {
      const newUser = { ...userData, id: `usr-${Date.now()}` };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

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
  const filteredUsers =
    selectedDepartment === "All"
      ? users
      : users.filter((user) => user.department === selectedDepartment);

  const onToggleStatus = () => {
    console.log("toggle clicked");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="departmentFilter"
              className="text-gray-700 font-medium"
            >
              Filter by Department:
            </label>
            <select
              id="departmentFilter"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddNewUser}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Add New User</span>
          </button>
        </div>
        <UserList users={filteredUsers} onEditUser={handleEditUser} onToggleStatus={onToggleStatus}/>
      </div>

      {/* Conditionally render the UserForm as a modal */}
      {showForm && (
        <UserForm
          initialUser={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default UserManagement;
