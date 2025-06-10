
const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <label>{label}</label>
  </div>
);

export default CheckboxField;
