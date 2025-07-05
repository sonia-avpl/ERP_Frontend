import { Plus } from "lucide-react";
import NewItemForm from "../../../components/form/NewItemForm";
import { useState } from "react";

const Items = () => {
  const [showItemForm, setShowItemForm] = useState();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold">All Items</div>
        <button
          onClick={() => setShowItemForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
        {showItemForm && <NewItemForm onClose={() => setShowItemForm(false)} />}
      </div>
    </>
  );
};

export default Items;
