import { useState, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useGet } from "../hooks/useGet";
import { baseUrl } from "../utilis";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";
// react icons
import { FaSortUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

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

  // Inventory drop down
  const [openInventoryDropdown, setOpenInventoryDropdown] = useState({});
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
                  {section.items.map((item, itemIdx) => {
                    const isInventory = item.name === "Inventory";
                    const isSales = item.name === "Sales";
                    const isPurchases = item.name === "Purchases";

                    const isActive = location.pathname === item.to;

                    if (isInventory) {
                      return (
                        <div key={itemIdx} className="w-full">
                          <button
                            onClick={() =>
                              setOpenInventoryDropdown(!openInventoryDropdown)
                            }
                            className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                              isActive
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              {isSidebarExpanded && <span>{item.name}</span>}
                            </div>
                            {isSidebarExpanded && (
                              <span className="ml-auto">
                                {openInventoryDropdown ? <FaSortUp /> : <FaCaretDown />}
                              </span>
                            )}
                          </button>

                          {/* Dropdown Children */}
                          {openInventoryDropdown && isSidebarExpanded && (
                            <div className="ml-8 mt-1 space-y-1 text-sm">
                              <button
                                onClick={() => navigate("/inventory/items")}
                                className={`flex items-center gap-2 p-2 rounded w-full ${
                                  location.pathname === "/inventory/items"
                                    ? "bg-gray-700 text-white"
                                    : "hover:bg-gray-700 hover:text-white"
                                }`}
                              >
                                <span className="w-4 h-4 bg-gray-400 rounded-full" />
                                Items
                              </button>
                              <button
                                onClick={() =>
                                  navigate("/inventory/item-groups")
                                }
                                className={`flex items-center gap-2 p-2 rounded w-full ${
                                  location.pathname === "/inventory/item-groups"
                                    ? "bg-gray-700 text-white"
                                    : "hover:bg-gray-700 hover:text-white"
                                }`}
                              >
                                <span className="w-4 h-4 bg-gray-400 rounded-full" />
                                Item Groups
                              </button>
                              <button
                                onClick={() =>
                                  navigate("/inventory/adjustments")
                                }
                                className={`flex items-center gap-2 p-2 rounded w-full ${
                                  location.pathname === "/inventory/adjustments"
                                    ? "bg-gray-700 text-white"
                                    : "hover:bg-gray-700 hover:text-white"
                                }`}
                              >
                                <span className="w-4 h-4 bg-gray-400 rounded-full" />
                                Inventory Adjustments
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }

                    if (isSales) {
                      return (
                        <div key={itemIdx} className="w-full">
                          <button
                            onClick={() =>
                              setOpenSalesDropdown(!openSalesDropdown)
                            }
                            className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                              location.pathname.startsWith("/sales")
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              {isSidebarExpanded && <span>{item.name}</span>}
                            </div>
                            {isSidebarExpanded && (
                              <span>{openSalesDropdown ? <FaSortUp /> : <FaCaretDown />}</span>
                            )}
                          </button>

                          {openSalesDropdown && isSidebarExpanded && (
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

                    if (isPurchases) {
                      return (
                        <div key={itemIdx} className="w-full">
                          <button
                            onClick={() =>
                              setOpenPurchasesDropdown(!openPurchasesDropdown)
                            }
                            className={`flex items-center justify-between gap-2 p-2 rounded w-full ${
                              location.pathname.startsWith("/purchases")
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              {isSidebarExpanded && <span>{item.name}</span>}
                            </div>
                            {isSidebarExpanded && (
                              <span>{openPurchasesDropdown ? <FaSortUp /> : <FaCaretDown />}</span>
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
