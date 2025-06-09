import { useState, useEffect } from "react";
import axios from "axios";

export function useGet(url, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    if (!url) return;

    setLoading(true);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, setData, loading, error, refetch: fetchData };
}
