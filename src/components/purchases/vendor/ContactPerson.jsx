import { useState } from "react";
import { X } from "lucide-react";

const ContactPerson = () => {
  const [contacts, setContacts] = useState([
    { salutation: "", firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...contacts];
    updatedContacts[index][name] = value;
    setContacts(updatedContacts);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { salutation: "", firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
    ]);
  };

  const removeContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="w-full mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Salutation</th>
              <th className="border border-gray-300 px-3 py-2">First Name</th>
              <th className="border border-gray-300 px-3 py-2">Last Name</th>
              <th className="border border-gray-300 px-3 py-2">Email Address</th>
              <th className="border border-gray-300 px-3 py-2">Work Phone</th>
              <th className="border border-gray-300 px-3 py-2">Mobile</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1">
                  <select
                    name="salutation"
                    value={contact.salutation}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value=""></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    name="firstName"
                    value={contact.firstName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    name="lastName"
                    value={contact.lastName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    name="email"
                    value={contact.email}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    name="workPhone"
                    value={contact.workPhone}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    name="mobile"
                    value={contact.mobile}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
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
