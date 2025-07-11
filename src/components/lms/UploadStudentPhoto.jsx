import { Upload } from "lucide-react";

const UploadStudentPhoto = ({
  studentImage,
  setUpload,
  handleSignatureChange,
  studentImagePreview,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">
        Upload Student Photo <span className="text-red-500">*</span>
      </label>

      <div className="flex items-center gap-4">
        {/* Preview */}
        {studentImagePreview ? (
          <img
            src={URL.createObjectURL(studentImage)}
            alt="Student Preview"
            className="h-24 w-24 object-cover border-2 border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <div className="h-24 w-24 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-md text-gray-400 text-sm">
            No Photo
          </div>
        )}

        {/* Custom styled file input */}
        <div>
          <label
            htmlFor="studentImage"
            className="inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium py-2 px-4 rounded-md cursor-pointer text-sm"
          >
            <Upload/>
          </label>
          <input
            type="file"
            accept="image/*"
            name="studentImage"
            id="studentImage"
            onChange={(e) => handleSignatureChange(e, "studentImage")}
            className="hidden"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Accepted formats: JPG, PNG. Max size: 2MB. Recommended: 3x4 ratio.
      </p>
    </div>
  );
};

export default UploadStudentPhoto;
