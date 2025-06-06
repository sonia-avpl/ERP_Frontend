import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilis";

function VerifyResetOtp() {
  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const { postData, loading, error } = usePost();
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to next input
    if (index < otp.length - 1 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    const data = await postData(`${baseUrl}/auth/verify-reset-otp`, {
      email,
      otp: fullOtp,
    });
    if (data) {
      navigate("/reset-password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl mb-4 text-center">Enter OTP</h2>
      <div className="flex justify-center gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {error && (
        <p className="text-red-500 mt-2 text-sm text-center">
          {error.message || "OTP verification failed"}
        </p>
      )}
    </form>
  );
}

export default VerifyResetOtp;
