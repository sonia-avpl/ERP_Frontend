// components/form/TextAreaField.jsx
const TextAreaField = ({ label, name, value, onChange, placeholder, required }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border rounded p-2 resize-none"
      rows={4}
    />
  </div>
);

export default TextAreaField;
