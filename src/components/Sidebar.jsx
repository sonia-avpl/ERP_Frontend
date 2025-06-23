import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";
import { baseUrl } from "../utills/enum";

const Sidebar = ({ userRole }) => {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const roleMenus = menuConfig[userRole] || [];
  const topMenus = [...topCommonMenus, ...roleMenus];
  const bottomMenus = [...bottomCommonMenus];
  return (
    <div className="flex text-sm">
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
        <div className="flex flex-col justify-between h-full px-2 py-4">
          <div>
            <div
              className={`text-xl font-semibold mb-6 px-4 py-2 ${
                !isSidebarExpanded && "hidden md:block"
              }`}
            >
              ERP
            </div>
            {topMenus.map((section, idx) => (
              <div key={idx} className="mb-4 lg:pt-0 pt-5">
                <div className="text-xs uppercase mb-2 px-2 hidden md:block">
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

          {/* Logout Button */}
          <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
