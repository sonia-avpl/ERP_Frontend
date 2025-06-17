import { useState, useEffect } from "react";
import ApiService from "../services/axiosInstance";

export function useGet(url, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await ApiService.get(url);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, setData, loading, error, refetch: fetchData };
}
