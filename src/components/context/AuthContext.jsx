import { createContext, useContext, useState, useEffect } from "react";
import { useGet } from "../../hooks/useGet";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roleName, setRoleName] = useState("");
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
