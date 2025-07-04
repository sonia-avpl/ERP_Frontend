import { useState } from "react";
import toast from "react-hot-toast";
import ApiService from "../services/axiosInstance";

export function usePostFile(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (url, body) => {
    
    setLoading(true);
    try {
      const res = await ApiService.post(url, body);
      setResponse(res.data);
      setError(null);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      const messages = err.response?.data?.message || err.message;
      setError(messages);
      setResponse(null);

      if (Array.isArray(messages)) {
        messages.forEach((msg) => toast.error(msg.message));
      } else {
        toast.error(`Error: ${messages}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
}
