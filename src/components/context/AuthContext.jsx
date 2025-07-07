import { createContext, useContext, useState, useEffect } from "react";
import { useGet } from "../../hooks/useGet";

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

  const { data, isLoading, error } = useGet(user?.role ? `auth/role/${user.role}` : null);
  const [roleName, setRoleName] = useState(() => localStorage.getItem("roleName"));
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (data?.roleName) {
      setRoleName(data.roleName);
      setLoading(false);
    } else if (!isLoading && !data) {
      setLoading(false);
    }
  }, [data, isLoading]);

  // Handle logout
  const logout = () => {
    setUser(null);
    setRoleName(null);
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
