import { useState } from "react";
import axios from "axios";

export function useDelete(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteData = async (url) => {
    setLoading(true);
    try {
      const res = await axios.delete(url, {
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

  return { deleteData, loading, error, response };
}
