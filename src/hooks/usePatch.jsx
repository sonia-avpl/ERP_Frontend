import { useState } from "react";
import axios from "axios";

export function usePatch(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const patchData = async (url, body) => {
    setLoading(true);
    try {
      const res = await axios.patch(url, body, {
        headers: {
        //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data);
      setError(null);
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
