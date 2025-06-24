import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Left: Dropdown */}
      <div>All Items</div>

      {/* Right: + New button */}
      <button
        onClick={() => navigate("/inventory/items/new")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
      >
        <Plus className="w-4 h-4" />
        New
      </button>
    </div>
  );
};

export default Items;