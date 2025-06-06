import { useEffect, useState, useRef } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilis";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { postData, loading, error } = usePost();
  const navigate = useNavigate();

  const inputsRef = useRef([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registerEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleOtpChange = (element, index) => {
    if (/^\d?$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move focus to next input
      if (element.value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("enteredOtp",enteredOtp)
   
    const result = await postData(`${baseUrl}/auth/verify-email`, {
      email,
      otp: enteredOtp,
    });

    if (result) {
      localStorage.removeItem("registerEmail");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Verify Your Email</h2>

        <p className="mb-6 text-gray-700">
          Email: <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleOtpChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border border-gray-300 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric"
              pattern="\d*"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {error && (
          <p className="text-red-500 mt-4">{error.response?.data?.message || error.message}</p>
        )}
      </form>
    </div>
  );
}

export default VerifyEmail;
