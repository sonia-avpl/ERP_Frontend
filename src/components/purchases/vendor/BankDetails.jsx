import { EyeOff } from "lucide-react";

const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

const BankSection = ({ data, setData }) => {
  const banks = data;
  const showForm = banks.length > 0;

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...banks];
    updated[index][name] = value;
    setData(updated);
  };

  const addBank = () => {
    setData([
      ...banks,
      {
        accountHolder: "",
        bankName: "",
        accountNumber: "",
        reAccountNumber: "",
        ifsc: "",
      },
    ]);
  };

  const removeBank = (index) => {
    const updated = banks.filter((_, i) => i !== index);
    setData(updated);
  };

  return (
    <div className="w-full mx-auto mt-10 px-4">
      {!showForm ? (
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            Add your vendor's bank details and make payments.
          </p>
          <button
            onClick={addBank}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Bank Account
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 border rounded"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeBank(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  value={bank.accountHolder}
                  onChange={(e) => handleChange(index, e)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={bank.bankName}
                  onChange={(e) => handleChange(index, e)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="accountNumber"
                    value={bank.accountNumber}
                    onChange={(e) => handleChange(index, e)}
                    className={inputClass}
                  />
                  <EyeOff
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Re-enter Account Number*
                </label>
                <input
                  type="password"
                  name="reAccountNumber"
                  value={bank.reAccountNumber}
                  onChange={(e) => handleChange(index, e)}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">IFSC*</label>
                <input
                  type="text"
                  name="ifsc"
                  value={bank.ifsc}
                  onChange={(e) => handleChange(index, e)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addBank}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add New Bank
          </button>
        </div>
      )}
    </div>
  );
};

const BankDetails = ({ data, setData }) => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <BankSection data={data} setData={setData} />
    </div>
  );
};

export default BankDetails;
