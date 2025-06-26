import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utills/enum";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      console.warn("No token found, skipping user fetch.");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ CORRECT
        },
      });

      if (response?.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setError(null);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.error("Fetch user failed:", err.response?.data || err.message);
      setError("Session expired or invalid.");
      setUser(null); // clear user on failure
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, fetchUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
