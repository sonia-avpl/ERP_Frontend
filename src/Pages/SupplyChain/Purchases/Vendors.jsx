import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold">All Items</div>
        <button
          onClick={() => navigate("/inventory/vendors/new")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>
    </>
  );
};

export default Vendors;
