import { useState } from "react";

const NewTest = ({ onClose }) => {
  const [testFields, setTestFields] = useState([{ name: "", measurement: "" }]);
  const [testTitle, setTestTitle] = useState("");

  const addTestField = () => {
    setTestFields([...testFields, { name: "", measurement: "" }]);
  };

  const removeTestField = (index) => {
    if (testFields.length === 1) return;
    setTestFields(testFields.filter((_, i) => i !== index));
  };

  const updateField = (index, key, value) => {
    const updated = [...testFields];
    updated[index][key] = value;
    setTestFields(updated);
  };


  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto p-6 sm:p-8 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-600">
          New Test
        </h2>

        <form className="space-y-10">
          {/* Test Title */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-1">
              Test Title
            </label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter test title"
            />
          </div>

          {/* Test Details (Name & Measurement) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-gray-800">
                Test Details
              </label>
              <button
                type="button"
                onClick={addTestField}
                className="flex items-center justify-center gap-1 text-white bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 px-4 py-1.5 rounded-full shadow transition duration-200"
              >
                <span className="text-lg font-bold">+</span> Add
              </button>
            </div>

            <div className="space-y-6">
              {testFields.map((field, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(index, "name", e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder={`Test Name ${index + 1}`}
                    />
                    {testFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTestField(index)}
                        className="text-gray-500 hover:text-gray-600 text-xl font-bold px-2 transition-transform transform hover:scale-110"
                        title="Remove"
                      >
                        &minus;
                      </button>
                    )}
                  </div>
                  <textarea
                    value={field.measurement}
                    onChange={(e) =>
                      updateField(index, "measurement", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Test measurement"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewTest;
