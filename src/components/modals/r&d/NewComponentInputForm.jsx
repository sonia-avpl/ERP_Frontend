import { useState, useEffect } from "react";
import { useGet } from "../../../hooks/useGet";
import { usePostFile } from "../../../hooks/usePostFile";
import { usePatchFile } from "../../../hooks/usePatchFile"; // Import usePatchFile
import { componentTypes } from "../../../utilis";

const NewComponentInputForm = ({
  onClose,
  mode = "create",
  initialData = null,
  refetch,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    componentType: "",
    category: "",
    useCase: "",
    physicalProperties: {
      dimensions: "",
      weight: "",
      material: "",
      mounting: "",
      color: "",
    },
    electricalProperties: {
      voltageRange: "",
      currentDraw: "",
      processor: "",
      imu: "",
      barometer: "",
    },
    connectivity: {
      uartPorts: "",
      i2cPorts: "",
      usb: "",
      bluetooth: "",
      osd: "",
    },
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [user, setUser] = useState(null);
  const { data: categories } = useGet(`categories`);
  const { postData, isLoading: postLoading, error: postError } = usePostFile(); // Renamed loading and error
  const { patchData, isLoading: patchLoading, error: patchError } = usePatchFile(); // Destructure patchData and its loading/error

  // Combine loading and error states for UI
  const isLoading = postLoading || patchLoading;
  const error = postError || patchError;

  console.log(formData);

  // Effect to load user data from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
      }
    } catch (e) {
      console.error("Failed to parse user data from localStorage", e);
    }
  }, []);

  // Effect to populate form data when in 'edit' mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        componentType: initialData.componentType || "",
        // Set category to its _id for the select input
        category: initialData.category?._id || "", 
        useCase: initialData.useCase || "",
        // Explicitly set each nested property with fallback to empty string
        physicalProperties: {
          dimensions: initialData.physicalProperties?.dimensions || "",
          weight: initialData.physicalProperties?.weight || "",
          material: initialData.physicalProperties?.material || "",
          mounting: initialData.physicalProperties?.mounting || "",
          color: initialData.physicalProperties?.color || "",
        },
        electricalProperties: {
          voltageRange: initialData.electricalProperties?.voltageRange || "",
          currentDraw: initialData.electricalProperties?.currentDraw || "",
          processor: initialData.electricalProperties?.processor || "",
          imu: initialData.electricalProperties?.imu || "",
          barometer: initialData.electricalProperties?.barometer || "",
        },
        connectivity: {
          uartPorts: initialData.connectivity?.uartPorts || "",
          i2cPorts: initialData.connectivity?.i2cPorts || "",
          usb: initialData.connectivity?.usb || "",
          bluetooth: initialData.connectivity?.bluetooth || "",
          osd: initialData.connectivity?.osd || "",
        },
        file: null, // Ensure file input is reset for editing
      });

      if (initialData.imageUrl) {
        setPreviewUrl(initialData.imageUrl);
      }
    }
  }, [mode, initialData]);

  // Handles changes for all form inputs, including nested ones
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length > 1) {
      // Handle nested properties (e.g., physicalProperties.dimensions)
      const [parentKey, childKey] = keys;
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Handle top-level properties (e.g., name, componentType)
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handles file input change and sets up preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      console.error("User is not available. Cannot submit form.");
      return;
    }

    const form = new FormData();

    // Append image file if it exists
    // Note: For PATCH requests, you might only send the image if it has changed.
    // For simplicity, we're sending it always if available, but consider backend handling.
    if (formData.file) {
      form.append("image", formData.file);
    }

    // Append top-level form data fields
    form.append("name", formData.name);
    form.append("componentType", formData.componentType);
    form.append("category", formData.category);
    form.append("useCase", formData.useCase);

    // Append nested physicalProperties by iterating through its keys
    // This ensures each sub-property is a separate field in FormData
    for (const key in formData.physicalProperties) {
      if (formData.physicalProperties[key]) {
        form.append(`physicalProperties.${key}`, formData.physicalProperties[key]);
      }
    }

    // Append nested electricalProperties
    for (const key in formData.electricalProperties) {
      if (formData.electricalProperties[key]) {
        form.append(`electricalProperties.${key}`, formData.electricalProperties[key]);
      }
    }

    // Append nested connectivity
    for (const key in formData.connectivity) {
      if (formData.connectivity[key]) {
        form.append(`connectivity.${key}`, formData.connectivity[key]);
      }
    }

    // Append the designedBy user ID
    form.append("designedBy", user._id);

    // Determine the API endpoint based on mode (create or edit)
    const endpoint =
      mode === "edit" ? `components/${initialData._id}` : "components/add";

    let response;
    // Make the API call to post or patch the form data
    if (mode === "edit") {
      response = await patchData(endpoint, form); // Call patchData for edit mode
    } else {
      response = await postData(endpoint, form); // Call postData for create mode
    }

    if (response?.success) {
      refetch(); // Refresh data after successful submission
      onClose(); // Close the modal
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 font-sans">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {mode === "edit" ? "Edit Component" : "Add New Component"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* Component Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Component Image
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          {/* Image Preview */}
          {previewUrl && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <img
                src={previewUrl}
                alt="Component Preview"
                className="max-h-32 rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          )}
          {/* Name Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., CUAV V5+ Autopilot"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/* Component Type Select */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Component Type
            </label>
            <select
              name="componentType"
              value={formData.componentType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Select Type</option>
              {componentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Select Category</option>
              {categories?.data?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* Physical Properties Section */}
          <div className="md:col-span-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium mb-2 text-gray-800">
              Physical Properties
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="physicalProperties.dimensions"
                value={formData.physicalProperties.dimensions || ""}
                onChange={handleChange}
                placeholder="Dimensions (e.g., 85x55x15mm)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="physicalProperties.weight"
                value={formData.physicalProperties.weight}
                onChange={handleChange}
                placeholder="Weight (e.g., 80g)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="physicalProperties.material"
                value={formData.physicalProperties.material}
                onChange={handleChange}
                placeholder="Material"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="physicalProperties.mounting"
                value={formData.physicalProperties.mounting}
                onChange={handleChange}
                placeholder="Mounting"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="physicalProperties.color"
                value={formData.physicalProperties.color}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
          {/* Electrical Properties Section */}
          <div className="md:col-span-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium mb-2 text-gray-800">
              Electrical Properties
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="electricalProperties.voltageRange"
                value={formData.electricalProperties.voltageRange}
                onChange={handleChange}
                placeholder="Voltage Range"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="electricalProperties.currentDraw"
                value={formData.electricalProperties.currentDraw}
                onChange={handleChange}
                placeholder="Current Draw"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="electricalProperties.processor"
                value={formData.electricalProperties.processor}
                onChange={handleChange}
                placeholder="Processor"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="electricalProperties.imu"
                value={formData.electricalProperties.imu}
                onChange={handleChange}
                placeholder="IMU"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="electricalProperties.barometer"
                value={formData.electricalProperties.barometer}
                onChange={handleChange}
                placeholder="Barometer"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
          {/* Connectivity Section */}
          <div className="md:col-span-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium mb-2 text-gray-800">
              Connectivity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="connectivity.uartPorts"
                value={formData.connectivity.uartPorts}
                onChange={handleChange}
                placeholder="UART Ports"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="connectivity.i2cPorts"
                value={formData.connectivity.i2cPorts}
                onChange={handleChange}
                placeholder="I2C Ports"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="connectivity.usb"
                value={formData.connectivity.usb}
                onChange={handleChange}
                placeholder="USB"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="connectivity.bluetooth"
                value={formData.connectivity.bluetooth}
                onChange={handleChange}
                placeholder="Bluetooth"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
              <input
                name="connectivity.osd"
                value={formData.connectivity.osd}
                onChange={handleChange}
                placeholder="OSD"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>
          {/* Use Case Textarea */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Use Case</label>
            <textarea
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the primary use case..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading
                ? mode === "edit"
                  ? "Updating..."
                  : "Submitting..."
                : mode === "edit"
                ? "Update Component"
                : "Submit Component"}
            </button>
            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">
                {typeof error === "string"
                  ? error
                  : "An unknown error occurred"}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewComponentInputForm;
