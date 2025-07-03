import { Plus } from "lucide-react";
import { useState } from "react";
import VendorForm from "../../../components/form/VendorForm";
import { useGet } from "../../../hooks/useGet";
import { Link } from "react-router-dom";

const Vendors = () => {
  const [showVendorForm, setShowVendorForm] = useState(false);

  const { data, loading, refetch } = useGet("/vendors");
  // const vendors = data?. || [];
  // console.log("Vendors fetched from API:", data);

  const handleCloseForm = () => {
    setShowVendorForm(false);
    refetch();
  };

  return (
    <>
      <div
        className="flex items-center justify-between border-b bg-white rounded-t-xl my-6 mx-4"
      >
        <div className="text-lg font-semibold">Vendors</div>
        <button
          onClick={() => setShowVendorForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
        {showVendorForm && <VendorForm onClose={handleCloseForm} />}
      </div>

      <div className="overflow-x-auto  my-10 bg-white rounded-b-xl shadow-md mx-4 mt-0">
        {loading ? (
          <div className="text-center text-gray-600 py-10">
            Loading vendors...
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No vendor yet.</div>
        ) : (
          <table className="min-w-full table-fixed text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Payables</th>
                <th className="px-4 py-3">Unused Credits</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 text-gray-700">
              {data?.data?.map((vendor, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td className="px-4 py-2">{vendor.companyName}</td>
                  <td className="px-4 py-2 text-blue-600 underline">
                    {vendor.companyEmail || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {vendor.vendorMobileNumber ||
                      vendor.vendorPhoneNumber ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 1000)}
                  </td>
                  <td className="px-4 py-2">
                    Rs.{Math.floor(Math.random() * 700)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/vendors/${vendor._id}`}>
                      <button className="ml-2 text-blue-500 hover:text-blue-700 text-sm">
                        View
                      </button>
                    </Link>
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
