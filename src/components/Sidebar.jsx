import { useState, useRef } from "react";
import { Bars3Icon} from "@heroicons/react/24/outline";
import { useGet } from "../hooks/useGet";
import { baseUrl } from "../utilis";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";

const Sidebar = ({ userRole }) => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const isResizing = useRef(false);
  const { data: projects, setData } = useGet(`${baseUrl}/projects`);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { logout } = useAuth();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      addProject(projectName);
      setProjectName("");
      setShowModal(false);
    }
  };
  const addProject = (newProject) => {
    setData((prev) => [...prev, newProject]);
  };

  const startResizing = () => {
    isResizing.current = true;
  };
  const stopResizing = () => {
    isResizing.current = false;
  };
  const handleResizing = (e) => {
    if (isResizing.current) {
      const newWidth = Math.min(Math.max(e.clientX, 180), 400);
      setSidebarWidth(newWidth);
    }
  };
  const roleMenus = menuConfig[userRole] || [];
  const topMenus = [...topCommonMenus, ...roleMenus];
  const bottomMenus = [...bottomCommonMenus];
  return (
    <div
      className="flex text-sm"
      onMouseMove={handleResizing}
      onMouseUp={stopResizing}
      onMouseLeave={stopResizing}
    >
      <button
        className="md:hidden fixed top-2 left-4 z-50 rounded shadow"
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        <Bars3Icon className="h-6 w-6 " />
      </button>

      <div
        className={`bg-white h-screen relative overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "w-64 pt-16" : "w-16"
        } md:pt-0`}
        style={{
          width: isSidebarExpanded ? sidebarWidth : 64,
        }}
      >
        <div className="space-y-6 px-2">
          {/* MAIN */}
          <div
            className={`text-xl font-semibold mb-6 px-4 py-2 ${
              !isSidebarExpanded && "hidden md:block"
            }`}
          >
            ERP
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              {topMenus.map((section, idx) => (
                <div key={idx} className="mb-4">
                  <div className="text-xs uppercase mb-2 px-2">
                    {section.section}
                  </div>
                  {section.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => navigate(item.to)}
                      className={`flex items-center gap-2 p-2 rounded w-full ${
                        location.pathname === item.to
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {isSidebarExpanded && <span>{item.name}</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Render Administration section at the bottom */}
            <div className="mb-2">
              {bottomMenus.map((section, idx) => (
                <div key={idx}>
                  <div className="text-xs uppercase mb-2 px-2">
                    {section.section}
                  </div>
                  {section.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => navigate(item.to)}
                      className={`flex items-center gap-2 p-2 rounded w-full ${
                        location.pathname === item.to
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {isSidebarExpanded && <span>{item.name}</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-2 hover:bg-gray-800 hover:text-white p-2 rounded w-full"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarExpanded && <span>Logout</span>}
          </button>
        </div>

        {/* Resize Handle only for md+ */}
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-transparent hidden md:block"
          onMouseDown={startResizing}
        />
      </div>
    </div>
  );
};

export default Sidebar;
