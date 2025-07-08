import { useEffect, useState } from "react";
import InputPassword from "../form/InputPassword";
import SelectField from "../form/SelectField";
import InputField from "../form/InputField";
import { departments, role } from "../../utills/enum";
import { usePost } from "../../hooks/usePost";
import { usePatch } from "../../hooks/usePatch";

const UserForm = ({ initialUser, onCancel, refetch }) => {
  const [user, setUser] = useState(
    initialUser || {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      department: departments[0],
      role: role[0],
    }
  );
  const [errors, setErrors] = useState({});
  const { postData, loading } = usePost();
  const { patchData } = usePatch();
  useEffect(() => {
    setUser(
      initialUser || {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        role: role[0],
      }
    );
    setErrors({});
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required.";
    if (!user.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Invalid email.";
    if (!user.address.trim()) newErrors.address = "Address is required.";
    if (!user.department) newErrors.department = "Department is required.";
    if (!user.role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...user };
    if (!user.password) delete payload.password;

    let response;
    if (initialUser) {
      response = await patchData(`auth/edit/${initialUser._id}`, payload);
    } else {
      response = await postData(`auth/add`, payload);
    }

    if (response?.success) {
      onCancel();
      refetch();
      setUser({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        department: departments[0],
        role: role[0],
      });
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {initialUser ? "Edit User" : "Create New User"}
        </h2>
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
            <InputField
              label="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <InputField
              label="Phone"
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
            {!initialUser && (
              <InputPassword
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            )}
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="2"
              value={user.address}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4 pt-5">
             
              <SelectField
                label="Role"
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                options={role}
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
            >
              {initialUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
