import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { bottomCommonMenus, menuConfig, topCommonMenus } from "../data/menu";
import SidebarDropdown from "./SidebarDropDown";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [openSupplyChainDropdown, setOpenSupplyChainDropdown] = useState(false);
  const [openPrincipalPanelDropdown, setOpenPrincipalPanelDropdown] =
    useState(false);
  const [openRndModuleDropdown, setOpenRndModuleDropdown] = useState(false);

  const roleMenus = menuConfig[userRole] || [];
  const topMenus = [...topCommonMenus, ...roleMenus];
  const bottomMenus = [...bottomCommonMenus];

  useEffect(() => {
    // Lock scrolling when sidebar is open on mobile
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";

    // Force expanded sidebar when opened on mobile
    if (isMobileOpen) {
      setIsSidebarExpanded(true);
    }
  }, [isMobileOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarWidth = isMobileOpen
    ? "w-64"
    : isSidebarExpanded
    ? "w-64"
    : "w-16";

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
          overflow-y-auto shadow-md bg-slate-100
          ${sidebarWidth}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:block
        `}
      >
        <div className="flex flex-col h-full px-2 py-4 text-gray-700">
          {/* Logo */}
          <div className="flex items-center justify-center h-16">
            <Link to="/">
              <img
                src="/logo/logo.png"
                alt="Logo"
                className={`transition-all duration-300 object-contain ${
                  isSidebarExpanded ? "h-10 w-auto" : "h-10 w-10"
                }`}
              />
            </Link>
          </div>

          <div className="absolute top-4 right-1 hidden md:block">
            <button
              onClick={() => setIsSidebarExpanded((prev) => !prev)}
              className="rounded-full bg-transparent hover:ring-2 hover:ring-gray-400 transition duration-200"
              aria-label="Toggle sidebar"
            >
              {isSidebarExpanded ? (
                <IoIosArrowBack className="h-5 w-5 text-gray-400" />
              ) : (
                <IoIosArrowForward className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {topMenus.map((section, idx) => (
              <div key={idx} className="p-2 border-b border-gray-300">
                {section.items.map((item, itemIdx) => {
                  const isActive = location.pathname === item.to;
                  const props = {
                    key: item.name,
                    item,
                    isSidebarExpanded,
                    navigate,
                    location,
                    isMobileOpen,
                    setIsMobileOpen,
                  };

                  if (item.name === "Supply Chain") {
                    return (
                      <SidebarDropdown
                        {...props}
                        isOpen={openSupplyChainDropdown}
                        toggle={() => setOpenSupplyChainDropdown((p) => !p)}
                      />
                    );
                  }
                  if (item.name === "Principal Panel") {
                    return (
                      <SidebarDropdown
                        {...props}
                        isOpen={openPrincipalPanelDropdown}
                        toggle={() => setOpenPrincipalPanelDropdown((p) => !p)}
                      />
                    );
                  }
                  if (item.name === "R&D Modules") {
                    return (
                      <SidebarDropdown
                        {...props}
                        isOpen={openRndModuleDropdown}
                        toggle={() => setOpenRndModuleDropdown((p) => !p)}
                      />
                    );
                  }

                  return (
                    <button
                      key={itemIdx}
                      onClick={() => {
                        navigate(item.to);
                        setIsMobileOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded w-full transition-colors duration-200 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-indigo-500 hover:text-white"
                      }`}
                    >
                      <span className="text-lg text-gray-600">{item.icon}</span>
                      {isSidebarExpanded && <span>{item.name}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-auto p-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-500 hover:text-white text-red-600 p-2 rounded w-full"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarExpanded && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
