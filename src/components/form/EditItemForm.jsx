import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError("Failed to load item.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    console.log("Submitting data:", formData);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/items/${id}`,
        formData
      );
      console.log("Updated item:", response.data);
      navigate(`/inventory/items/${id}`);

      console.log("redirected page");
      

    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update item.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Item Name"
            />
          </div>

          <div>
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SKU
            </label>
            <input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="SKU"
            />
          </div>

          <div>
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unit
            </label>
            <input
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Unit"
            />
          </div>

          <div>
            <label
              htmlFor="sellingPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selling Price
            </label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Selling Price"
            />
          </div>
        </div>

        {/* Sales Description */}
        <div>
          <label
            htmlFor="salesDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sales Description
          </label>
          <textarea
            id="salesDescription"
            name="salesDescription"
            value={formData.salesDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Sales description..."
          />
        </div>

        {/* Inventory Tracking */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="trackInventory"
            name="trackInventory"
            checked={formData.trackInventory}
            onChange={handleChange}
          />
          <label htmlFor="trackInventory" className="text-sm text-gray-700">
            Track Inventory
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Update Item"}
        </button>
      </form>
    </div>
  );
};

export default EditItemForm;
