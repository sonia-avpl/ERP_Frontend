import { useNavigate } from "react-router-dom";

const UserProfileCard = ({ setOpen, userRole }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <section className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
      <div className="p-2 space-y-1 text-sm text-gray-700">
        <div>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
          >
            Profile
          </button>
        </div>
        {userRole === "Admin" && (
          <>
            <div>
              <button
                onClick={() => handleClick("/user-management")}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
              >
                User Management
              </button>
            </div>
            <div>
              <button
                onClick={() => handleClick("/project-managment")}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
              >
                Project Management
              </button>
            </div>
          </>
        )}

        <div>
          <button
            onClick={() => handleClick("/settings")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
          >
            Settings
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
