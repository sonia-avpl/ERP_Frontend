import { NavLink, Outlet } from "react-router-dom";
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/outline";

const tabs = [
  { name: "Board", path: "/projects/board", icon: ListBulletIcon },
  { name: "List", path: "/projects/list", icon: ListBulletIcon },
  { name: "Table", path: "/projects/table", icon: TableCellsIcon },
];

const ProjectDetail = () => {
  return (
    <div>
      
      <nav className="border-b border-gray-300 mb-4">
        <ul className="flex space-x-6">
          {tabs.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-1 pb-2 text-gray-600 hover:text-gray-900 text-sm ${
                    isActive
                      ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                      : ""
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProjectDetail;
