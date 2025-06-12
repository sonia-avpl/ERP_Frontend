import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const DebouncedSearchInput = ({ onSearch, delay = 500, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onSearch]);

  return (
    <div className="relative w-full md:w-64">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border pl-10 pr-3 py-2 rounded w-full"
      />
    </div>
  );
};

export default DebouncedSearchInput;
