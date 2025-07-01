import React, { useState } from "react";

const Address = () => {
  const initialAddress = {
    country: "",
    street1: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };

  const [billingAddress, setBillingAddress] = useState(initialAddress);
  const [shippingAddress, setShippingAddress] = useState(initialAddress);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    const updater = type === "billing" ? setBillingAddress : setShippingAddress;
    const address = type === "billing" ? billingAddress : shippingAddress;
    updater({ ...address, [name]: value });
  };

  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };

  const inputClass = `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150`;

  const renderFields = (type, data, handleChangeFn) => (
    <>
      {/* <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Attention</label>
        <input
          name="attention"
          value={data.attention}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div> */}

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Country / Region
        </label>
        <select
          name="country"
          value={data.country}
          onChange={handleChangeFn}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="street1"
          placeholder="Street 1"
          value={data.street1}
          onChange={handleChangeFn}
          className={inputClass}
        />
        {/* <textarea
          name="street2"
          placeholder="Street 2"
          value={data.street2}
          onChange={handleChangeFn}
          className={inputClass}
        /> */}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">City</label>
        <input
          name="city"
          value={data.city}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">State</label>
        <select
          name="state"
          value={data.state}
          onChange={handleChangeFn}
          className={inputClass}
        >
          <option value="">Select or type to add</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="California">California</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Zip Code</label>
        <input
          name="zip"
          value={data.zip}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={data.phone}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-1">Fax Number</label>
        <input
          name="fax"
          value={data.fax}
          onChange={handleChangeFn}
          className={inputClass}
        />
      </div> */}
    </>
  );
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
          {renderFields("billing", billingAddress, (e) =>
            handleChange(e, "billing")
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
            Shipping Address{" "}
            <button
              type="button"
              onClick={copyBillingToShipping}
              className="text-blue-600 text-sm hover:underline"
            >
              (↓ Copy billing address)
            </button>
          </h2>
          {renderFields("shipping", shippingAddress, (e) =>
            handleChange(e, "shipping")
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
