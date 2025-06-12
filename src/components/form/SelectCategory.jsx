import React from "react";

const SelectCategory = ({ label, name, value, onChange, options, required }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 p-2 rounded"
      >
        <option value="">Select {label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
