import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import InputField from "../../components/form/InputField";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilis";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const { postData, loading, error } = usePost();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postData('auth/login', form);
    if (data) {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const data = await postData(`${baseUrl}/auth/forgot-password`, {
      email: forgotEmail,
    });
    if (data) {
      localStorage.setItem("resetEmail", forgotEmail);
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={showForgot ? handleForgotSubmit : handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
           <img src="/logo/logo.png" alt="logo" className="w-28 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {showForgot ? "Forgot Password" : "Login to your account"}
        </h2>

        {showForgot ? (
          <>
            <InputField
              label="Email"
              type="email"
              name="forgotEmail"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition mt-5`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p
              className="mt-4 text-sm text-blue-600 cursor-pointer text-center"
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </p>
          </>
        ) : (
          <>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your professional email"
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 mt-5"
              } transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p
              className="mt-4 text-sm text-blue-600 cursor-pointer text-center"
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </p>
          </>
        )}
        <p className="text-sm mt-4 text-center">
         Don’t have an account?
          <Link to="/register" className="text-blue-600 hover:underline">
           Sign up
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-center mt-4">
            {error.message || "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
