const NewProtoInputForm = ({onClose}) => {
  return (
    <section>
      <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
        NewProtoInputForm
        <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            New Component
          </h2>
        </div>
      </section>
    </section>
  );
};

export default NewProtoInputForm;
