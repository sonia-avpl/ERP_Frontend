import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";
import SidebarDropdown from "./SidebarDropDown";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen((p) => !p)}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`bg-white h-screen fixed inset-y-0 left-0 z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSidebarExpanded ? "w-64" : "w-16"
        } md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: isSidebarExpanded ? sidebarWidth : 64,
        }}
      >
        <div className="flex flex-col justify-between h-full px-2">
          <div>
            <div className="space-y-6 px-2">
              <div
                className={`text-xl font-semibold px-4 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                <div className="flex justify-end p-4 md:hidden">
                  <button onClick={() => setIsMobileOpen(false)}>
                    <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>

                <div className="px-4 mb-4">
                  <img src="/logo/logo.png" alt="Logo" className="w-12" />
                </div>
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
                              isMobileOpen={isMobileOpen}
                              setIsMobileOpen={setIsMobileOpen}
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
                              isMobileOpen={isMobileOpen}
                              setIsMobileOpen={setIsMobileOpen}
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
                              isMobileOpen={isMobileOpen}
                              setIsMobileOpen={setIsMobileOpen}
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
