import { X } from "lucide-react";

const ContactPerson = ({ data = [], setData }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...data];
    updatedContacts[index][name] = value;
    setData(updatedContacts);
  };

  const addContact = () => {
    setData([
      ...data,
      { firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
    ]);
  };

  const removeContact = (index) => {
    const updatedContacts = data.filter((_, i) => i !== index);
    setData(updatedContacts);
  };

  const renderInput = (index, name, value) => (
    <td className="border border-gray-300 px-2 py-1">
      <input
        name={name}
        value={value || ""}
        onChange={(e) => handleChange(index, e)}
        className="w-full px-2 py-1 border border-gray-300 rounded"
      />
    </td>
  );

  return (
    <div className="w-full mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2">First Name</th>
              <th className="border border-gray-300 px-3 py-2">Last Name</th>
              <th className="border border-gray-300 px-3 py-2">Email Address</th>
              <th className="border border-gray-300 px-3 py-2">Work Phone</th>
              <th className="border border-gray-300 px-3 py-2">Mobile</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact, index) => (
              <tr key={index}>
                {renderInput(index, "firstName", contact.firstName)}
                {renderInput(index, "lastName", contact.lastName)}
                {renderInput(index, "email", contact.email)}
                {renderInput(index, "workPhone", contact.workPhone)}
                {renderInput(index, "mobile", contact.mobile)}
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button
                    onClick={() => removeContact(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addContact}
        className="mt-3 text-blue-600 text-sm hover:underline"
      >
        + Add Contact Person
      </button>
    </div>
  );
};

export default ContactPerson;
