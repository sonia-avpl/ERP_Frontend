import { useState } from "react";
import {
  UsersIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ProjectCreateModal from "../modals/ProjectCreateModal";


const ToggleButton = ({ setIsTeamOpen, isTeamOpen,handleSubmit,showModal,setShowModal,projectName,setProjectName }) => {


  return (
    <div className="relative">
      {/* Toggle and Add Icons */}
      <div className="flex items-center justify-between hover:bg-gray-800 p-2 rounded cursor-pointer">
        <button
          onClick={() => setIsTeamOpen(!isTeamOpen)}
          className="flex items-center gap-2 w-full"
        >
          <UsersIcon className="h-5 w-5" />
          <span>Project Managment</span>
          {isTeamOpen ? (
            <ChevronUpIcon className="h-4 w-4 ml-auto" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 ml-auto" />
          )}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="p-1 hover:bg-gray-700 rounded"
          title="Add Project"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Modal Component */}
      <ProjectCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        projectName={projectName}
        setProjectName={setProjectName}
      />
    </div>
  );
};

export default ToggleButton;
