import { useState, useRef } from "react";
import {
  HomeIcon,
  FolderIcon,
  CubeIcon,
  PuzzlePieceIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  ArchiveBoxIcon,
  TruckIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UserGroupIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import ToggleButton from "./buttons/ToggleButton";
import { useGet } from "../hooks/useGet";
import { baseUrl } from "../utilis";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = ({ userRole }) => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const isResizing = useRef(false);
  const { data: projects, setData } = useGet(`${baseUrl}/projects`);
  const navigate = useNavigate();
 const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

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

  return (
    <div
      className="flex text-sm"
      onMouseMove={handleResizing}
      onMouseUp={stopResizing}
      onMouseLeave={stopResizing}
    >
      {/* Toggle button - only visible on small screens */}
      <button
        className="md:hidden fixed top-2 left-4 z-50  rounded shadow"
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        <Bars3Icon className="h-6 w-6 text-gray-300" />
      </button>

      <div
        className={`bg-gray-900 text-white h-screen relative overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
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
            ClickUp Clone
          </div>
          <div>
            <div
              className={`text-xs text-gray-400 uppercase mb-2 px-2 ${
                !isSidebarExpanded && "hidden md:block"
              }`}
            >
              Main
            </div>
            <button
              className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
              onClick={() => navigate("/")}
            >
              <HomeIcon className="h-5 w-5" />
              {isSidebarExpanded && <span>Dashboard</span>}
            </button>
          </div>

          {/* R&D MODULES */}
          {userRole === "R&D" && (
            <div>
              <div
                className={`text-xs text-gray-400 uppercase mb-2 px-2 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                R&D Modules
              </div>
              <button
                onClick={() => navigate("/component-design")}
                className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
              >
                <CubeIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Component Design</span>}
              </button>
              <button
                onClick={() => navigate("/prototype-management")}
                className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
              >
                <BeakerIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Prototype Management</span>}
              </button>
              <button
                onClick={() => navigate("/testing-validation")}
                className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Testing & Validation</span>}
              </button>
              <button
                onClick={() => navigate("/compliance-docs")}
                className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
              >
                <PuzzlePieceIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Compliance & Docs</span>}
              </button>
            </div>
          )}

          {/* OPERATIONS */}
          {userRole === "R&D" && (
            <div>
              <div
                className={`text-xs text-gray-400 uppercase mb-2 px-2 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                Operations
              </div>
              <button
                className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full"
                onClick={() => navigate("/inventory")}
              >
                <ArchiveBoxIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Inventory</span>}
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <TruckIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Supply Chain</span>}
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <ShieldCheckIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Quality Control</span>}
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <Cog6ToothIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Manufacturing</span>}
              </button>
            </div>
          )}

          {/* ADMINISTRATION */}
          {userRole === "R&D" && (
            <div>
              <div
                className={`text-xs text-gray-400 uppercase mb-2 px-2 ${
                  !isSidebarExpanded && "hidden md:block"
                }`}
              >
                Administration
              </div>
              <ToggleButton
                setIsTeamOpen={setIsTeamOpen}
                isTeamOpen={isTeamOpen}
                onAddProject={addProject}
                handleSubmit={handleSubmit}
                showModal={showModal}
                setShowModal={setShowModal}
                projectName={projectName}
                setProjectName={setProjectName}
              />
              {isTeamOpen && isSidebarExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project._id}
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded w-full text-sm"
                    >
                      <FolderIcon className="h-4 w-4" />
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <ChartBarIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Reporting</span>}
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <UserGroupIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>User Management</span>}
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
                <Cog6ToothIcon className="h-5 w-5" />
                {isSidebarExpanded && <span>Settings</span>}
              </button>
            </div>
          )}
          <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded w-full">
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
