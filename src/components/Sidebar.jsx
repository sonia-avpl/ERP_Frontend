import { useState, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useGet } from "../hooks/useGet";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";

// react icons
import { FaSortUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const Sidebar = ({ userRole }) => {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  // Inventory drop down
  const [openInventoryDropdown, setOpenInventoryDropdown] = useState(false);
  // sales drop down
  const [openSalesDropdown, setOpenSalesDropdown] = useState(false);
  // purchase drop down
  const [openPurchasesDropdown, setOpenPurchasesDropdown] = useState(false);

  // toggle function for the inventory drop down
  const toggleDropdown = (name) => {
    setOpenInventoryDropdown((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
                className={`text-xl font-semibold mb-6 px-4 py-2 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                <img
                  src="/public/logo/logo.png"
                  alt="erp-logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="flex flex-col h-full justify-between">
                <div>
                  {topMenus.map((section, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="text-xs uppercase mb-2 px-2">
                        {section.section}
                      </div>
                      {section.items.map((item, itemIdx) => {
                        const isInventory = item.name === "Inventory";
                        // const isSales = item.name === "Sales";
                        const isPurchases = item.name === "Purchases";

                        const isActive = location.pathname === item.to;

                        if (isInventory) {
                          return (
                            <div key={itemIdx} className="w-full">
                              <button
                                onClick={() =>
                                  setOpenInventoryDropdown(
                                    !openInventoryDropdown
                                  )
                                }
                                className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "hover:bg-gray-800 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon}
                                  {isSidebarExpanded && (
                                    <span>{item.name}</span>
                                  )}
                                </div>
                                {isSidebarExpanded && (
                                  <span className="ml-auto">
                                    {openInventoryDropdown ? (
                                      <FaSortUp />
                                    ) : (
                                      <FaCaretDown />
                                    )}
                                  </span>
                                )}
                              </button>
                              {openInventoryDropdown && isSidebarExpanded && (
                                <div className="ml-8 mt-1 space-y-1 text-sm">
                                  {item.children.map((child, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => navigate(child.to)}
                                      className={`flex items-center gap-2 p-2 rounded w-full ${
                                        location.pathname === child.to
                                          ? "bg-gray-700 text-white"
                                          : "hover:bg-gray-700 hover:text-white"
                                      }`}
                                    >
                                      {child.icon}
                                      {child.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        // if (isSales) {
                        //   return (
                        //     <div key={itemIdx} className="w-full">
                        //       <button
                        //         onClick={() =>
                        //           setOpenSalesDropdown(!openSalesDropdown)
                        //         }
                        //         className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                        //           location.pathname.startsWith("/sales")
                        //             ? "bg-gray-800 text-white"
                        //             : "hover:bg-gray-800 hover:text-white"
                        //         }`}
                        //       >
                        //         <div className="flex items-center gap-2">
                        //           {item.icon}
                        //           {isSidebarExpanded && (
                        //             <span>{item.name}</span>
                        //           )}
                        //         </div>
                        //         {isSidebarExpanded && (
                        //           <span>
                        //             {openSalesDropdown ? (
                        //               <FaSortUp />
                        //             ) : (
                        //               <FaCaretDown />
                        //             )}
                        //           </span>
                        //         )}
                        //       </button>

                        //       {openSalesDropdown && isSidebarExpanded && (
                        //         <div className="ml-8 mt-1 space-y-1 text-sm">
                        //           {item.children.map((child, idx) => (
                        //             <button
                        //               key={idx}
                        //               onClick={() => navigate(child.to)}
                        //               className={`flex items-center gap-2 p-2 rounded w-full ${
                        //                 location.pathname === child.to
                        //                   ? "bg-gray-700 text-white"
                        //                   : "hover:bg-gray-700 hover:text-white"
                        //               }`}
                        //             >
                        //               {child.icon}
                        //               <span>{child.name}</span>
                        //             </button>
                        //           ))}
                        //         </div>
                        //       )}
                        //     </div>
                        //   );
                        // }

                        if (isPurchases) {
                          return (
                            <div key={itemIdx} className="w-full">
                              <button
                                onClick={() =>
                                  setOpenPurchasesDropdown(
                                    !openPurchasesDropdown
                                  )
                                }
                                className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                                  location.pathname.startsWith("/purchases")
                                    ? "bg-gray-800 text-white"
                                    : "hover:bg-gray-800 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon}
                                  {isSidebarExpanded && (
                                    <span>{item.name}</span>
                                  )}
                                </div>
                                {isSidebarExpanded && (
                                  <span>
                                    {openPurchasesDropdown ? (
                                      <FaSortUp />
                                    ) : (
                                      <FaCaretDown />
                                    )}
                                  </span>
                                )}
                              </button>

                              {openPurchasesDropdown && isSidebarExpanded && (
                                <div className="ml-8 mt-1 space-y-1 text-sm">
                                  {item.children.map((child, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => navigate(child.to)}
                                      className={`flex items-center gap-2 p-2 rounded w-full ${
                                        location.pathname === child.to
                                          ? "bg-gray-700 text-white"
                                          : "hover:bg-gray-700 hover:text-white"
                                      }`}
                                    >
                                      {child.icon}
                                      <span>{child.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
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
                {/* {topMenus.map((section, idx) => (
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
            ))} */}
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
