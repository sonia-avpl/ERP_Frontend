
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  const path = location.pathname;

  const getTitle = (path) => {
    if (path === "/") return "Dashboard";
    if (path.startsWith("/projects/")) return "Project Detail";
    if (path.startsWith("/projects")) return "Projects";
    return path.replace("/", "").replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {user && <Sidebar userRole="R&D" />}

      <main className="flex-1 p-4 overflow-y-auto h-full">
        <div className="flex items-center justify-between border-b pb-2">
          <p className="text-sm text-gray-600">{getTitle(path)}</p>
          
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
