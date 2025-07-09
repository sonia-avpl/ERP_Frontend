const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  endIcon,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {endIcon && endIcon}
      </div>
    </div>
  );
};

export default InputField;
