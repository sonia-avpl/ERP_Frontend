import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";

function App() {
  const location = useLocation();
  const path = location.pathname;

  const getTitle = (path) => {
    if (path === "/") return "Dashboard";
    if (path.startsWith("/projects/")) return "Project Detail";
    if (path.startsWith("/projects")) return "Projects";
    return path.replace("/", "").replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole="R&D" />
      
      <main className="flex-1 p-4 overflow-y-auto h-full">
        <p className="text-sm text-gray-600 mb-2 pb-2 border-b">
          {getTitle(path)}
        </p>
        
        <AllRoutes />
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
