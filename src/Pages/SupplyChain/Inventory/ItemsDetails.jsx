import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../hooks/useGet";

const ItemsDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const {
    data: item,
    loading,
    error,
    refetch,
  } = useGet(`/inventory/${itemId}`);
  console.log("Items data : ", item);
  console.log("itemId: ", itemId);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading vendor data...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load vendor details.
      </div>
    );
  if (!item)
    return (
      <div className="text-center py-10 text-gray-500">Vendor not found.</div>
    );

  return (
    <div className="w-full bg-slate-100 min-h-screen py-8 px-6 lg:px-12">
      <div className="mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Items Overview</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-indigo-200 hover:bg-indigo-300 text-indigo-900 rounded-lg"
            >
              ← Back
            </button>
            {/* <button
              onClick={() => setShowEditForm(true)}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Edit Vendor
            </button> */}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vendor Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Vendor Info
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Name:</strong> {item.name}
                </div>
                <div>
                  <strong>SKU:</strong> {item.sku}
                </div>
                <div>
                  <strong>Unit:</strong> {item.unit}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
      {/* Items Details */}
    </div>
  );
};

export default ItemsDetails;
