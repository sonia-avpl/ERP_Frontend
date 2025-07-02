import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../../../hooks/useGet";
import { useState } from "react";
import VendorForm from "../../../components/form/VendorForm";

const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: vendor, loading, error } = useGet(`/vendors/${vendorId}`);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading vendor data...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load vendor details.
      </div>
    );
  if (!vendor)
    return (
      <div className="text-center py-10 text-gray-500">Vendor not found.</div>
    );

  const {
    firstName,
    lastName,
    companyName,
    vendorMobileNumber,
    vendorPhoneNumber,
    displayNameType,
    contactPersons,
    otherDetails,
    address,
    bankDetails,
  } = vendor;

  return (
    <div className="w-full bg-slate-100 min-h-screen py-8 px-6 lg:px-12">
      <div className="mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            Vendor Overview
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-indigo-200 hover:bg-indigo-300 text-indigo-900 rounded-lg"
            >
              ← Back
            </button>
            <button
              onClick={() => setShowEditForm(true)}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Edit Vendor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vendor Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Vendor Info
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Name:</strong> {firstName} {lastName}
                </div>
                <div>
                  <strong>Company:</strong> {companyName}
                </div>
                <div>
                  <strong>Display Name:</strong> {displayNameType}
                </div>
                <div>
                  <strong>Email:</strong> {vendor.email || "N/A"}
                </div>
                <div>
                  <strong>Phone:</strong> {vendorPhoneNumber || "N/A"}
                </div>
                <div>
                  <strong>Mobile:</strong> {vendorMobileNumber || "N/A"}
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div className="bg-blue-100 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Contact Persons
              </h2>
              <div className="space-y-4">
                {contactPersons?.map((person, index) => (
                  <div
                    key={index}
                    className="bg-white border border-blue-200 p-4 rounded-lg text-sm text-blue-800 shadow-sm"
                  >
                    <div>
                      <strong>Name:</strong> {person.firstName}{" "}
                      {person.lastName || ""}
                    </div>
                    <div>
                      <strong>Email:</strong> {person.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {person.phoneNumber || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="bg-yellow-100 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                Addresses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Billing Address
                  </h3>
                  <p>{address?.billing?.address}</p>
                  <p>
                    {address?.billing?.city}, {address?.billing?.state}
                  </p>
                  <p>
                    {address?.billing?.country} - {address?.billing?.pincode}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Shipping Address
                  </h3>
                  <p>{address?.shipping?.address}</p>
                  <p>
                    {address?.shipping?.city}, {address?.shipping?.state}
                  </p>
                  <p>
                    {address?.shipping?.country} - {address?.shipping?.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Other Details */}
            <div className="bg-green-100 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                Other Details
              </h2>
              <div className="space-y-2 text-sm text-green-900">
                <div>
                  <strong>GST No:</strong> {otherDetails?.gstNo || "N/A"}
                </div>
                <div>
                  <strong>PAN:</strong> {otherDetails?.pan || "N/A"}
                </div>
                <div>
                  <strong>Payment Term:</strong>{" "}
                  {otherDetails?.paymentTerm || "N/A"}
                </div>
                <div>
                  <strong>Currency:</strong> {otherDetails?.currency || "N/A"}
                </div>
                <div>
                  <strong>Document:</strong>{" "}
                  {otherDetails?.document ? (
                    <a
                      href={`/${otherDetails.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 underline"
                    >
                      View Document
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-purple-100 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">
                Bank Details
              </h2>
              {bankDetails?.length > 0 ? (
                <div className="space-y-4">
                  {bankDetails.map((bank, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-md border border-purple-200 text-sm text-purple-800 shadow-sm"
                    >
                      <div>
                        <strong>Account Holder:</strong>{" "}
                        {bank.accountHolderName}
                      </div>
                      <div>
                        <strong>Bank:</strong> {bank.bankName}
                      </div>
                      <div>
                        <strong>Account #:</strong> {bank.accountNumber}
                      </div>
                      <div>
                        <strong>IFSC:</strong> {bank.ifsc}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No bank details available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showEditForm && (
        <VendorForm
          mode="edit"
          existingData={vendor}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
};

export default VendorDetails;
