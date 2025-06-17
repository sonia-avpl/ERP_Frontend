import { useState } from "react";

const ToggleButtonUser = ({
  initialState = false,
  onChange,
  onLabel = "On",
  offLabel = "Off",
}) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <label
      htmlFor="toggle-switch"
      className="flex items-center cursor-pointer select-none"
    >
      <input
        type="checkbox"
        id="toggle-switch"
        className="sr-only" 
        checked={isChecked}
        onChange={handleToggle}
      />

      <div
        className={`
                    relative inline-flex items-center h-5 w-12
                    rounded-full shadow-inner-lg transition-colors duration-300 ease-in-out
                    ${isChecked ? "bg-blue-600" : "bg-gray-300"}
                `}
      >
        <span
          className={`
                        absolute h-3 w-3 rounded-full shadow-md
                        bg-white transform transition-transform duration-300 ease-in-out
                        ${isChecked ? "translate-x-8" : "translate-x-1"}
                    `}
        ></span>
      </div>
    </label>
  );
};

export default ToggleButtonUser;
