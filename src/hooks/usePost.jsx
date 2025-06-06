import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function usePost(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (url, body) => {
    setLoading(true);
    try {
      const res = await axios.post(url, body, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data);
      setError(null);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message); // ✅ Only store the message
      setResponse(null);
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
}
