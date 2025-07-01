import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { EyeIcon } from "@heroicons/react/24/outline";

const Address = ({ data, setData }) => {
  const [billingCountryId, setBillingCountryId] = useState(0);
  const [billingStateId, setBillingStateId] = useState(0);
  const [shippingCountryId, setShippingCountryId] = useState(0);
  const [shippingStateId, setShippingStateId] = useState(0);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  // const copyBillingToShipping = () => {
  //   setData((prev) => ({
  //     ...prev,
  //     shipping: { ...prev.billing },
  //   }));
  // };

  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  const renderFields = (type, data, handleChangeFn) => (
    <>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Country / Region
        </label>
        <CountrySelect
          inputClassName={inputClass}
          value={type === "billing" ? billingCountryId : shippingCountryId}
          onChange={(c) => {
            if (type === "billing") {
              setBillingCountryId(c.id);
              setBillingStateId(0);
            } else {
              setShippingCountryId(c.id);
              setShippingStateId(0);
            }
            handleChange({ target: { name: "country", value: c.name } }, type);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">State</label>
        <StateSelect
          inputClassName={inputClass}
          countryid={type === "billing" ? billingCountryId : shippingCountryId}
          value={type === "billing" ? billingStateId : shippingStateId}
          onChange={(s) => {
            if (type === "billing") {
              setBillingStateId(s.id);
            } else {
              setShippingStateId(s.id);
            }
            handleChange({ target: { name: "state", value: s.name } }, type);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">City</label>
        <CitySelect
          inputClassName={inputClass}
          countryid={type === "billing" ? billingCountryId : shippingCountryId}
          stateid={type === "billing" ? billingStateId : shippingStateId}
          onChange={(city) =>
            handleChange({ target: { name: "city", value: city.name } }, type)
          }
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="street1"
          placeholder="Street 1"
          value={data.street1 || ""}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Zip Code</label>
        <input
          name="zip"
          value={data.zip || ""}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={data.phone || ""}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
          {renderFields("billing", data.billing || {}, (e) =>
            handleChange(e, "billing")
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
            Shipping Address{" "}
            {/* <button
              type="button"
              onClick={copyBillingToShipping}
              className="text-blue-600 text-sm hover:underline"
            >
              (↓ Copy billing address)
            </button> */}
          </h2>
          {renderFields("shipping", data.shipping || {}, (e) =>
            handleChange(e, "shipping")
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
