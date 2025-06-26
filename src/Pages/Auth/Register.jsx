import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/form/InputField";
import InputPassword from "../../components/form/InputPassword";
import SelectField from "../../components/form/SelectField";
import { usePost } from "../../hooks/usePost";
import { baseUrl } from "../../utills/enum";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate();
  const { postData, loading, error } = usePost();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData(`${baseUrl}/auth/register`, formData);
    if (result) {
      localStorage.setItem("registerEmail", formData.email);
      navigate("/verify-email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        <img src="/logo/logo.png" alt="logo" className="w-28 mx-auto mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Phone No."
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91"
          />
          <InputPassword
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <SelectField
            label="Role"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            options={["R&D", "HR", "Finance", "Admin"]}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition mt-6"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}

export default Register;
