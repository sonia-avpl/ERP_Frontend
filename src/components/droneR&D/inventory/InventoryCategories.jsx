import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import InventoryCategoryList from "./InventoryCategoryList";
import NewCategoryModal from "../../modals/inventory/NewCategoryModal";

const InventoryCategories = ({ data, loading, error, refetch  }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setShowModal(true);
  };
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded text-gray-700"
        >
          <PlusIcon className="h-4 w-4" />
          New
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {data && <InventoryCategoryList data={data} onEdit={handleEdit} />}

      <NewCategoryModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCategory(null);
        }}
        refetch={refetch}
        editingCategory={editingCategory}
      />
    </div>
  );
};

export default InventoryCategories;
