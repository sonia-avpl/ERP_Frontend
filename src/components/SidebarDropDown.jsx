import { FaCaretDown } from "react-icons/fa";

const SidebarDropdown = ({
  item,
  isOpen,
  toggle,
  isSidebarExpanded,
  navigate,
  location,
  basePath,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const active = location.pathname.startsWith(basePath);

  return (
    <div className="w-full">
      <div className="relative">
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          className={`flex items-center justify-between p-2 rounded w-full transition-colors duration-200
            ${active ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            {isSidebarExpanded && <span>{item.name}</span>}
          </div>

          {isSidebarExpanded && (
            <span
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <FaCaretDown />
            </span>
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
            ${isSidebarExpanded ? "ml-8" : "ml-3"}`}
        >
          <div className="space-y-1 text-sm py-1">
            {item.children.map((child) => {
              const isChildActive = location.pathname === child.to;
              return (
                <button
                  key={child.to}
                  onClick={() => {
                    navigate(child.to);
                    if (isMobileOpen) setIsMobileOpen(false);
                  }}
                  title={!isSidebarExpanded ? child.name : undefined}
                  className={`flex items-center gap-2 p-2 rounded w-full text-left transition
                    ${isChildActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}
                    ${!isSidebarExpanded ? "justify-center" : ""}`}
                >
                  
                  <span className="text-xl">{child.icon}</span>
                  {isSidebarExpanded && <span>{child.name}</span>}
                  
                </button>
                
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  ); 
};

export default SidebarDropdown;
