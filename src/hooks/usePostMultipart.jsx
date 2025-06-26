import { useState } from "react";
import ApiService from "../services/axiosInstance";
import { toast } from "react-hot-toast";

const usePostMultipart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const post = async (endpoint, data, isFormData = false, successMsg = "Submitted successfully") => {
    setLoading(true);
    setError(null);

    const toastId = toast.loading("Submitting...");

    try {
      const config = {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      };

      const res = await ApiService.post(endpoint, data, config);
      setResponse(res.data);
      toast.success(successMsg, { id: toastId });
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
      console.error("POST error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, response };
};

export default usePostMultipart;
