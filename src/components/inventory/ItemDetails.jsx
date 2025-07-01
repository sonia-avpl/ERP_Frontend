import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/items/${id}`
        );
        setItem(response.data);
      } catch (err) {
        setError("Failed to load item details.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!item) return <div className="p-4">Item not found.</div>;

  return (

    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
      {item.images?.[0] && (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-32 h-32 object-cover rounded border mb-4"
        />
      )}
      <div>
        <strong>SKU:</strong> {item.sku}
      </div>
      <div>
        <strong>Type:</strong> {item.type}
      </div>
      <div>
        <strong>Sales Description:</strong> {item.salesDescription || "—"}
      </div>
      <div>
        <strong>Purchase Description:</strong> {item.purchaseDescription || "—"}
      </div>
      <div>
        <strong>Selling Price:</strong> ₹{item.sellingPrice || "—"}
      </div>
      <div className="mt-4">
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    </div>
=======
   <section className="p-6 md:p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-md space-y-6">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-800">{item.name || "Untitled Item"}</h2>
    {item.images?.[0] && (
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
      />
    )}
  </div>

  {/* Basic Info */}
  <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
    <div><span className="font-medium">Type:</span> {item.type}</div>
    <div><span className="font-medium">SKU:</span> {item.sku}</div>
    <div><span className="font-medium">Unit:</span> {item.unit}</div>
    <div><span className="font-medium">Preferred Vendor:</span> {item.preferredVendor || "—"}</div>
  </div>

  {/* Sales Info */}
  <div>
    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-1">Sales Information</h3>
    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
      <div><span className="font-medium">Selling Price:</span> ₹{item.sellingPrice || "—"}</div>
      <div><span className="font-medium">Sales Account:</span> {item.salesAccount}</div>
      <div className="md:col-span-2">
        <span className="font-medium">Description:</span> {item.salesDescription || "—"}
      </div>
    </div>
  </div>

  {/* Purchase Info */}
  <div>
    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-1">Purchase Information</h3>
    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
      <div><span className="font-medium">Cost Price:</span> ₹{item.costPrice || "—"}</div>
      <div><span className="font-medium">Purchase Account:</span> {item.purchaseAccount}</div>
      <div className="md:col-span-2">
        <span className="font-medium">Description:</span> {item.purchaseDescription || "—"}
      </div>
    </div>
  </div>

  {/* Inventory Tracking */}
  {item.trackInventory && (
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-1">Inventory Tracking</h3>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div><span className="font-medium">Inventory Account:</span> {item.inventoryAccount}</div>
        <div><span className="font-medium">Valuation Method:</span> {item.valuationMethod}</div>
        <div><span className="font-medium">Opening Stock:</span> {item.openingStock}</div>
        <div><span className="font-medium">Opening Stock Rate:</span> ₹{item.openingStockRate}</div>
        <div><span className="font-medium">Reorder Point:</span> {item.reorderPoint}</div>
      </div>
    </div>
  )}

  <div className="mt-6 flex items-center gap-4">
  <button
    onClick={() => navigate(`/inventory/items/${item._id}/edit`)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium shadow"
  >
    Update Item
  </button>
  <button
    onClick={() => navigate(`/inventory/items`)}
    className="bg-gray-200 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-md text-sm font-medium border border-gray-300 shadow-sm transition"
  >
    ← Go Back
  </button>
</div>

</section>


  );
};

export default ItemDetails;
