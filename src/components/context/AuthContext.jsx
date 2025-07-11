import { createContext, useContext, useState, useEffect } from "react";
import { useGet } from "../../hooks/useGet";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [roleName, setRoleName] = useState(() => {
    return localStorage.getItem("roleName") || "";
  });

  const { data: userData, loading } = useGet(`auth/me`);

  useEffect(() => {
    if (userData) {
      setUser(userData); 
      setRoleName(userData?.role?.name || "");
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("roleName", userData?.role?.name || "");
    }
  }, [userData]);

  const logout = () => {
    setUser(null);
    setRoleName("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roleName");
  };

  return (
    <AuthContext.Provider value={{ user, roleName, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
