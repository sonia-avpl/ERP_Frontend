import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utilis";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { postData, loading, error } = usePost();
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const {token}=useParams()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postData(`${baseUrl}/auth/reset-password/${token}`, {
      email,
      newPassword: password,
    });
    if (data) {
      alert("Password changed. Please login.");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Set New Password</h2>
      <input
        className="border w-full p-2 mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded w-full" type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error.message}</p>}
    </form>
  );
}

export default ResetPassword;
