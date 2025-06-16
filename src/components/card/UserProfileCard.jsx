import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const navigate = useNavigate();
  return (
    <section className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
      <div className="p-2 space-y-1 text-sm text-gray-700">
        <div>
          <button className="w-full text-left hover:text-white px-4 py-2 rounded hover:bg-purple-500 transition">
            Profile
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/user-management")} className="w-full text-left px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition">
            User Management
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/project-managment")}
            className="w-full text-left px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition"
          >
            Project Management
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/settings")} className="w-full text-left px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition">
            Settings
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
