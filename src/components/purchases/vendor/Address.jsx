import { useEffect, useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { Country, State } from "country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const Address = ({ data, setData }) => {
  const [billingCountry, setBillingCountry] = useState(null);
  const [billingState, setBillingState] = useState(null);
  const [shippingCountry, setShippingCountry] = useState(null);
  const [shippingState, setShippingState] = useState(null);

  // Load initial country/state for edit mode
  useEffect(() => {
    if (data?.billing?.country) {
      const foundCountry = Country.getAllCountries().find(
        (c) => c.name === data.billing.country
      );
      if (foundCountry) {
        setBillingCountry(foundCountry);

        const foundState = State.getStatesOfCountry(foundCountry.isoCode).find(
          (s) => s.name === data.billing.state
        );
        if (foundState) setBillingState(foundState);
      }
    }

    if (data?.shipping?.country) {
      const foundCountry = Country.getAllCountries().find(
        (c) => c.name === data.shipping.country
      );
      if (foundCountry) {
        setShippingCountry(foundCountry);

        const foundState = State.getStatesOfCountry(foundCountry.isoCode).find(
          (s) => s.name === data.shipping.state
        );
        if (foundState) setShippingState(foundState);
      }
    }
  }, [data]);

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

  const inputClass =
    "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150";

  const renderFields = (type, typeData, handleChangeFn) => (
    <>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Country / Region</label>
        <CountrySelect
          inputClassName={inputClass}
          value={type === "billing" ? billingCountry : shippingCountry}
          onChange={(c) => {
            if (type === "billing") {
              setBillingCountry(c);
              setBillingState(null);
            } else {
              setShippingCountry(c);
              setShippingState(null);
            }
            handleChange({ target: { name: "country", value: c.name } }, type);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">State</label>
        <StateSelect
          inputClassName={inputClass}
          countryid={(type === "billing" ? billingCountry : shippingCountry)?.id}
          value={type === "billing" ? billingState : shippingState}
          onChange={(s) => {
            if (type === "billing") setBillingState(s);
            else setShippingState(s);
            handleChange({ target: { name: "state", value: s.name } }, type);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">City</label>
        <CitySelect
          inputClassName={inputClass}
          countryid={(type === "billing" ? billingCountry : shippingCountry)?.id}
          stateid={(type === "billing" ? billingState : shippingState)?.id}
          onChange={(city) =>
            handleChange({ target: { name: "city", value: city.name } }, type)
          }
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          placeholder="Full address"
          value={typeData.address || ""}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Pincode</label>
        <input
          name="pincode"
          value={typeData.pincode || ""}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={typeData.phone || ""}
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
            Shipping Address
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
