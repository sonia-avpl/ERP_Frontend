import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import VendorForm from "../../../components/form/VendorForm";
// import { useNavigate } from "react-router-dom";

const Vendors = () => {
  // const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [showVendorForm, setShowVendorForm] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vendorList")) || [];
    setVendors(data);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold">Vendors</div>
        <button
          onClick={() => setShowVendorForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
        {showVendorForm && (
          <VendorForm onClose={() => setShowVendorForm(false)} />
        )}
      </div>

      {/* Table or empty state */}
      <div className="overflow-x-auto mt-8 mx-4">
        {vendors.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No vendor yet.</div>
        ) : (
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500 uppercase">
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Work Phone</th>
                <th className="px-4 py-3">Payables</th>
                <th className="px-4 py-3">Unused Credits</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr
                  key={index}
                  className="border-t text-gray-700 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 text-blue-600 cursor-pointer underline">
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td className="px-4 py-2">{vendor.companyName}</td>
                  <td className="px-4 py-2">{vendor.email}</td>
                  <td className="px-4 py-2">{vendor.workPhone}</td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 1000)}
                  </td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 700)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Vendors;
