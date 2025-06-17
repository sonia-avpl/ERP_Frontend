import { useState, useEffect } from "react";
import InputField from "../../form/InputField";
import TextAreaField from "../../form/TextAreaField";
import CheckboxField from "../../form/CheckboxField";
import { usePostFile } from "../../../hooks/usePostFile";
import { baseUrl } from "../../../utilis";
import { usePatchFile } from "../../../hooks/usePatchFile";

const NewCategoryModal = ({ isOpen, onClose, refetch, editingCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: null,
    isActive: true,
  });
  const { postData, isLoading, error } = usePostFile();
  const { patchData } = usePatchFile();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || "",
        description: editingCategory.description || "",
        icon: null,
        isActive: editingCategory.isActive ?? true,
      });
      setPreviewUrl(
        editingCategory.icon ? editingCategory.imageUrl : null
      );
    }
  }, [editingCategory]);

  useEffect(() => {
    if (formData.icon) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewUrl(fileReader.result);
      fileReader.readAsDataURL(formData.icon);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.icon]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        icon: file,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("isActive", formData.isActive);
    if (formData.icon) form.append("icon", formData.icon);

    const url = editingCategory
      ? `${baseUrl}/inventory/category/${editingCategory._id}`
      : `${baseUrl}/inventory/category/create`;

    const data = editingCategory
      ? await patchData(url, form)
      : await postData(url, form);

    if (data?.success) {
      onClose();
      refetch();
      setFormData({ name: "", description: "", icon: null, isActive: true });
    } else {
      alert(data?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white relative rounded p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4">
          {editingCategory ? "Edit Category" : "Create New Category"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Category Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Icon Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded p-2"
            />
              
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Icon preview"
                className="mt-2 h-20 w-20 object-contain border rounded"
              />
            )}
          </div>

          <CheckboxField
            label="Is Active"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading
                ? editingCategory
                  ? "Updating..."
                  : "Creating..."
                : editingCategory
                ? "Update"
                : "Create"}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCategoryModal;
