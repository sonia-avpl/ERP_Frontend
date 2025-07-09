import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";
import SidebarDropdown from "./SidebarDropDown";

const Sidebar = ({ userRole }) => {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [openSupplyChainDropdown, setOpenSupplyChainDropdown] = useState(false);
  const [openPrincipalPanelDropdown, setOpenPrincipalPanelDropdown] =
    useState(false);
  const [openRndModuleDropdown, setOpenRndModuleDropdown] = useState(false);

  // toggle function for the inventory drop down
  // const toggleDropdown = (name) => {
  //   setopenSupplyChainDropdown((prev) => ({
  //     ...prev,
  //     [name]: !prev[name],
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (projectName.trim()) {
  //     addProject(projectName);
  //     setProjectName("");
  //     setShowModal(false);
  //   }
  // };
  // const addProject = (newProject) => {
  //   setData((prev) => [...prev, newProject]);
  // };

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
            <div className="space-y-6 px-2">
              {/* MAIN */}
              <div
                className={`text-xl font-semibold px-4 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                <img src="/logo/logo.png" alt="erp-logo" className="w-12" />
              </div>
              <div className="flex flex-col h-full justify-between">
                <div>
                  {topMenus.map((section, idx) => (
                    <div key={idx} className="p-2">
                      {section.items.map((item, itemIdx) => {
                        const isSupplyChain = item.name === "Supply Chain";
                        const isPrincipalPanel =
                          item.name === "Principal Panel";
                        const isRndModule = item.name === "R&D Modules";
                        const isActive = location.pathname === item.to;

                        if (isPrincipalPanel) {
                          return (
                            <SidebarDropdown
                              key={item.name}
                              item={item}
                              isOpen={openPrincipalPanelDropdown}
                              toggle={() =>
                                setOpenPrincipalPanelDropdown((prev) => !prev)
                              }
                              isSidebarExpanded={isSidebarExpanded}
                              navigate={navigate}
                              location={location}
                              // basePath="/supply-chain"
                            />
                          );
                        }

                        if (isRndModule) {
                          return (
                            <SidebarDropdown
                              key={item.name}
                              item={item}
                              isOpen={openRndModuleDropdown}
                              toggle={() =>
                                setOpenRndModuleDropdown((prev) => !prev)
                              }
                              isSidebarExpanded={isSidebarExpanded}
                              navigate={navigate}
                              location={location}
                              // basePath="/supply-chain"
                            />
                          );
                        }

                        if (isSupplyChain) {
                          return (
                            <SidebarDropdown
                              key={item.name}
                              item={item}
                              isOpen={openSupplyChainDropdown}
                              toggle={() =>
                                setOpenSupplyChainDropdown((prev) => !prev)
                              }
                              isSidebarExpanded={isSidebarExpanded}
                              navigate={navigate}
                              location={location}
                              // basePath="/supply-chain"
                            />
                          );
                        }

                        // Default item rendering
                        return (
                          <button
                            key={itemIdx}
                            onClick={() => navigate(item.to)}
                            className={`flex items-center gap-2 p-2 rounded w-full ${
                              isActive
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            {item.icon}
                            {isSidebarExpanded && <span>{item.name}</span>}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
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
      </div>
    </div>
  );
};

export default Sidebar;
