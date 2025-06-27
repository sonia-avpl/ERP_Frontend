import { useEffect, useState } from "react";
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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold">{item.name || "Untitled Item"}</h2>

      {/* Thumbnail */}
      {item.images?.[0] && (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Type:</strong> {item.type}
        </div>
        <div>
          <strong>SKU:</strong> {item.sku}
        </div>
        <div>
          <strong>Unit:</strong> {item.unit}
        </div>
        <div>
          <strong>Preferred Vendor:</strong> {item.preferredVendor || "—"}
        </div>
      </div>

      {/* Sales Info */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Sales Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Selling Price:</strong> ₹{item.sellingPrice || "—"}
          </div>
          <div>
            <strong>Sales Account:</strong> {item.salesAccount}
          </div>
          <div className="md:col-span-2">
            <strong>Description:</strong> {item.salesDescription || "—"}
          </div>
        </div>
      </div>

      {/* Purchase Info */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Purchase Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Cost Price:</strong> ₹{item.costPrice || "—"}
          </div>
          <div>
            <strong>Purchase Account:</strong> {item.purchaseAccount}
          </div>
          <div className="md:col-span-2">
            <strong>Description:</strong> {item.purchaseDescription || "—"}
          </div>
        </div>
      </div>

      {/* Inventory Tracking */}
      {item.trackInventory && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Inventory Tracking</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Inventory Account:</strong> {item.inventoryAccount}
            </div>
            <div>
              <strong>Valuation Method:</strong> {item.valuationMethod}
            </div>
            <div>
              <strong>Opening Stock:</strong> {item.openingStock}
            </div>
            <div>
              <strong>Opening Stock Rate:</strong> ₹{item.openingStockRate}
            </div>
            <div>
              <strong>Reorder Point:</strong> {item.reorderPoint}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate(`/inventory/items/${item._id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Edit Item
        </button>
        <button
          onClick={() => navigate(`/inventory/items`)}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
