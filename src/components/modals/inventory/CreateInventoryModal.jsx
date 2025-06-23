import { useState, useEffect } from "react";
import SelectField from "../../form/SelectField";
import { usePostFile } from "../../../hooks/usePostFile";
import * as XLSX from "xlsx";
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import toast from "react-hot-toast";
import { usePatchFile } from "../../../hooks/usePatchFile";
import SelectCategory from "../../form/SelectCategory";
import { usePost } from "../../../hooks/usePost";
import { baseUrl, FileModules } from "../../../utills/enum";


const CreateInventoryModal = ({
  isOpen,
  onClose,
  refetch,
  initialData = null,
  categories,
}) => {
  const categoryOptions = categories?.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    location: "",
    currentStock: 0,
    minStock: 1,
    maxStock: 10,
    unitCost: 0,
    unitPrice: "",
    supplier: "",
    supplierCode: "",
    description: "",
    tags: [],
    notes: "",
    images: [],
  });
  const { postData, } = usePostFile();
  const { patchData } = usePatchFile();
  const {uploadImageOnSWithModule}= usePost()
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    console.log("newFiles", newFiles);
    setFormData((prev) => {
      // Combine existing images with new selected files
      const updatedImages = [...prev.images, ...newFiles];
      return { ...prev, images: updatedImages };
    });

    // Create previews for all images (existing + new)
    setImagePreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (initialData) {
      let parsedTags = [];
      if (Array.isArray(initialData.tags)) {
        if (
          initialData.tags.length === 1 &&
          typeof initialData.tags[0] === "string" &&
          initialData.tags[0].startsWith("[")
        ) {
          try {
            parsedTags = JSON.parse(initialData.tags[0]);
          } catch (error) {
            console.error("Invalid tag format:", initialData.tags[0]);
          }
        } else {
          parsedTags = initialData.tags;
        }
      }

      setFormData({
        ...initialData,
        tags: parsedTags,
        category: initialData.category?._id || "", // set category to its ID
        images: initialData.images || [], // keep existing images as [{ url }]
      });

      // For previewing existing images
      if (initialData.images?.length > 0) {
        const previews = initialData.images.map((img) =>
          typeof img === "string" ? img : img.url
        );
        setImagePreviews(previews);
      }
    } else {
      // Default empty form
      setFormData({
        itemName: "",
        category: "",
        location: "",
        currentStock: 0,
        minStock: 0,
        maxStock: 10,
        unitCost: 0,
        unitPrice: "",
        supplier: "",
        supplierCode: "",
        description: "",
        tags: [],
        notes: "",
        images: [],
      });
      setImagePreviews([]);
    }
  }, [initialData]);

  const handleDownloadTemplate = async () => {
    const categoryNames = categories?.map((cat) => cat.name) || [];
    const locations = ["Gurgaon", "Bihar", "Others"];

    const workbook = await XlsxPopulate.fromBlankAsync();

    const sheet = workbook.sheet(0);
    sheet.name("Inventory Template");

    // Headers
    const headers = [
      "Item Name",
      "Category",
      "Location",
      "Current Stock",
      "Min Stock",
      "Max Stock",
      "Unit Cost",
      "Unit Price",
      "Supplier",
      "Supplier Code",
      "Description",
      "Tags",
      "Notes",
      "Image URLs (comma separated)",
    ];

    headers.forEach((header, i) => sheet.cell(1, i + 1).value(header));

    // Create hidden sheet for validation lists
    const hidden = workbook.addSheet("DataValidation");
    categoryNames.forEach((val, i) => hidden.cell(i + 1, 1).value(val));
    locations.forEach((val, i) => hidden.cell(i + 1, 2).value(val));
    hidden.hidden(true); // Hide the sheet

    // Set dropdowns in main sheet
    sheet.range("B2:B100").dataValidation({
      type: "list",
      allowBlank: true,
      formula1: `=DataValidation!$A$1:$A$${categoryNames.length}`,
      showDropDown: true,
    });

    sheet.range("C2:C100").dataValidation({
      type: "list",
      allowBlank: true,
      formula1: `=DataValidation!$B$1:$B$${locations.length}`,
      showDropDown: true,
    });

    // Download
    const blob = await workbook.outputAsync();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Inventory_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!rows.length) return alert("No data found in Excel");

      const user = JSON.parse(localStorage.getItem("user"));

      for (let row of rows) {
        const form = new FormData();

        const fields = {
          itemName: row["Item Name"],
          category: row["Category"],
          location: row["Location"],
          currentStock: row["Current Stock"],
          minStock: row["Min Stock"],
          maxStock: row["Max Stock"],
          unitCost: row["Unit Cost"],
          unitPrice: row["Unit Price"],
          supplier: row["Supplier"],
          supplierCode: row["Supplier Code"],
          description: row["Description"],
          tags:
            typeof row["Tags"] === "string"
              ? row["Tags"].split(",").map((t) => t.trim())
              : [],
          notes: row["Notes"],
          createdBy: user._id,
        };

        for (let key in fields) {
          if (key === "tags") {
            form.append(key, JSON.stringify(fields[key]));
          } else {
            form.append(key, fields[key]);
          }
        }

        const result = await postData(`${baseUrl}/inventory/create`, form);
        if (!result?.success) {
          console.error(
            `Failed to upload row: ${row["Item Name"]}`,
            result?.error
          );
        }
      }
      onClose();
      toast.success(result.message);
      e.target.value = "";
      refetch();
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploads = formData.images;
    delete formData.images;
    const user = JSON.parse(localStorage.getItem("user"));
    const form = new FormData();

    // for (let key in formData) {
    //   if (key === "tags") {
    //     form.append(key, JSON.stringify(formData[key]));
    //   } else if (key === "images" && formData.images.length > 0) {
    //     formData.images.forEach((img) => {
    //       if (img instanceof File) {
    //         form.append("images", img); // New file
    //       } else if (img.url) {
    //         form.append("images", JSON.stringify(img)); // Existing image
    //       }
    //     });
    //   } else if (key !== "createdBy") {
    //     form.append(key, formData[key]);
    //   }
    // }

    // form.append("createdBy", user._id);
    formData.createdBy=user._id
    const url = initialData
      ? `inventory/${initialData._id}`
      : `inventory/create`;

    const result = initialData
      ? await patchData(url, formData)
      : await postData(url, formData);
    if (result?.success) {
      await uploadImageOnSWithModule(uploads,result.data._id,FileModules.Inventory)
      onClose();
      refetch();
      setFormData({
        itemName: "",
        category: "",
        location: "",
        currentStock: 0,
        minStock: 0,
        maxStock: 1,
        unitCost: 0,
        unitPrice: "",
        supplier: "",
        supplierCode: "",
        description: "",
        tags: [],
        notes: "",
        images: [],
      });
      setImagePreviews([]);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {initialData ? "Edit Inventory Item" : "Add New Inventory"}
        </h2>
        {!initialData && (
          <div className="flex flex-col md:flex-row items-center justify-end gap-3 mb-4 text-xs">
            <label
              htmlFor="file-upload"
              className="border border-green-600 text-green-600 px-3 py-1 rounded-md font-semibold cursor-pointer hover:bg-green-100 transition text-center w-full md:w-auto"
            >
              Upload File
            </label>

            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
              className="hidden"
            />

            <button
              onClick={handleDownloadTemplate}
              type="button"
              className="border border-green-600 text-green-600 px-3 py-1 rounded-md font-semibold hover:bg-green-100 transition"
            >
              Download Excel Form
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <SelectCategory
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            options={categoryOptions}
          />

          <SelectField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            options={["Gurgaon", "Bihar", "Others"]}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Current Stock
            </label>
            <input
              type="number"
              name="currentStock"
              placeholder="Current Stock"
              value={formData.currentStock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Min Stock</label>
            <input
              type="number"
              name="minStock"
              placeholder="Minimum Stock"
              value={formData.minStock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Stock</label>
            <input
              type="number"
              name="maxStock"
              placeholder="Maximum Stock"
              value={formData.maxStock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit Cost</label>
            <input
              type="number"
              name="unitCost"
              placeholder="Unit Cost"
              value={formData.unitCost}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={formData.unitPrice}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supplier</label>
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Supplier Code
            </label>
            <input
              type="text"
              name="supplierCode"
              placeholder="Supplier Code"
              value={formData.supplierCode}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded w-full h-24 resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="border p-2 rounded w-full h-20 resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. electronics, fragile"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {imagePreviews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5  items-center justify-center text-xs hidden group-hover:flex"
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-medium"
            >
              {initialData ? "Update Inventory" : "Create Inventory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventoryModal;
