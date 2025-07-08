import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../hooks/useGet";
import NewItemForm from "../../../components/form/NewItemForm";
import { useState } from "react";

const ItemsDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const {
    data: item,
    loading,
    error,
    refetch,
  } = useGet(`/inventory/${itemId}`);
  // console.log("Items data : ", item);
  // console.log("itemId: ", itemId);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading items data...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load item details.
      </div>
    );
  if (!item)
    return (
      <div className="text-center py-10 text-gray-500">Item not found.</div>
    );

  return (
    <section className="bg-slate-50 py-8">
      <div className="container mx-auto px-6 lg:px-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* IMAGE PREVIEW */}
          <figure className="order-first lg:order-last flex justify-center lg:justify-end">
            <div className=" bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow max-w-xs w-full">
              {item.images?.length > 0 ? (
                <div>
                  {item.images.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`preview-${idx}`}
                      className=" h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No images available</p>
              )}
            </div>
          </figure>

          {/* CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-600">
                Items Overview
              </h1>
            </div>

            {/** Items Info **/}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                Items Info
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

            {/** Sales Info **/}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">
                Sales Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Selling Price:</strong>{" "}
                  {item?.salesInformation?.sellingPrice}
                </div>
                <div>
                  <strong>Location:</strong> {item?.salesInformation?.location}
                </div>
              </div>
            </div>

            {/** Purchase Info **/}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-amber-600 mb-4">
                Purchase Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Cost Price:</strong>{" "}
                  {item?.purchaseInformation?.purchasePrice}
                </div>
                <div>
                  <strong>Location:</strong>{" "}
                  {item?.purchaseInformation?.location}
                </div>
              </div>
            </div>

            {/** Track Inventory **/}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-purple-600 mb-4">
                Track Inventory
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Accounts:</strong>{" "}
                  {item?.trackInventory?.inventoryAccount}
                </div>
                <div>
                  <strong>Validation:</strong>{" "}
                  {item?.trackInventory?.inventoryValidationMethod}
                </div>
                <div>
                  <strong>Opening Stock:</strong>{" "}
                  {item?.trackInventory?.openingStock}
                </div>
                <div>
                  <strong>Opening Stock Rate:</strong>{" "}
                  {item?.trackInventory?.openingStockRatePerUnit}
                </div>
                <div>
                  <strong>Reorder Points:</strong>{" "}
                  {item?.trackInventory?.reorderPoint}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex justify-end gap-4">
          {" "}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm bg-indigo-200 text-indigo-900 rounded-lg hover:bg-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            ← Back
          </button>
          <button
            onClick={() => setShowEditForm(true)}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Edit Item
          </button>
        </div>
      </div>

      {showEditForm && (
        <NewItemForm
          mode="edit"
          existingData={item}
          onClose={() => setShowEditForm(false)}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default ItemsDetails;
