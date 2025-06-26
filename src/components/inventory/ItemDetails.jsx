import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  );
};

export default ItemDetails;
