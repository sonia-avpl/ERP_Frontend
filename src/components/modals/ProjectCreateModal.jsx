import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePost } from "../../hooks/usePost";
import { baseUrl } from "../../utilis";

const ProjectCreateModal = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const token = "your_token_here";
  const { postData, loading, error } = usePost(token);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await postData(`${baseUrl}/projects/create`, {
        name: projectName,
      });
      setProjectName("");
      onClose();
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 top-12 left-52 w-64 bg-white text-black rounded shadow p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-500 hover:text-red-800"
        title="Close"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <p className="text-sm font-medium mb-2">Project Name</p>

      <form onSubmit={onSubmit} className="pt-3">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full border px-3 py-1 rounded mb-3 text-sm"
          placeholder="Enter project name"
          autoFocus
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-600 text-xs mt-2">
          Error creating project: {error.message || "Unknown error"}
        </p>
      )}
    </div>
  );
};

export default ProjectCreateModal;
