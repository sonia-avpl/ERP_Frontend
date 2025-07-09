import { FaSortUp, FaCaretDown } from "react-icons/fa";

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
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className={`flex items-center justify-between p-2 rounded w-full ${
          active
            ? "bg-gray-800 text-white"
            : "hover:bg-gray-800 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-2">
          {item.icon}
          {isSidebarExpanded && <span>{item.name}</span>}
        </div>
        {isSidebarExpanded && (isOpen ? <FaSortUp /> : <FaCaretDown />)}
      </button>

      {isOpen && isSidebarExpanded && (
        <div className="ml-8 mt-1 space-y-1 text-sm">
          {item.children.map((child) => (
            <button
              key={child.to}
              onClick={() => {
                navigate(child.to);
                if (isMobileOpen) setIsMobileOpen(false); 
              }}
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
};

export default SidebarDropdown;
