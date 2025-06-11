import { useNavigate } from "react-router-dom";

export const NavigateButton = ({ path, icon: Icon, label, color }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${color}-500 hover:bg-${color}-50 transition-colors group`}
    >
      <div className="flex items-center">
        <Icon className={`w-5 h-5 text-gray-400 group-hover:text-${color}-500 mr-3`} />
        <span className={`text-gray-600 group-hover:text-${color}-600 font-medium`}>
          {label}
        </span>
      </div>
    </button>
  );
};
