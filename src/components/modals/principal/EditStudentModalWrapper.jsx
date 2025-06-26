import UpdateStudentForm from "./UpdateStudentForm";

export const EditStudentModalWrapper = ({ initialData, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white relative w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <UpdateStudentForm initialData={initialData} onClose={onClose} />
      </div>
    </div>
  );
};
