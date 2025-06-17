import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ApiService from "../services/axiosInstance";

export function usePatchFile(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const patchData = async (url, body) => {
    setLoading(true);
    try {
      const res = await ApiService.patch(url, body, {
        headers: {
        //   Authorization: `Bearer ${token}`,
           "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
      setError(null);
       toast.success(res.data.message);
     
      return res.data;
    } catch (err) {
      setError(err);
      setResponse(null);
      
    } finally {
      setLoading(false);
    }
  };

  return { patchData, loading, error, response };
}
