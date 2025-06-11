import { useState } from "react";
import { motion } from "framer-motion";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { baseUrl } from "../../../utilis";


const InventoryCategoryList = ({ data, onEdit }) => {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
  };
  

  return (
    <div className="space-y-4">
      <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
        {data?.slice(0, visibleCount).map((cat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
              cat.active
                ? "bg-blue-50 border border-blue-500"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <img
                  src={`http://localhost:5000${cat.icon}`}
                  alt={cat.name}
                  className="h-5 w-5"
                />
              </div>
              <div>
                <div className="font-medium text-gray-800">{cat.name}</div>
                <div className="text-sm text-gray-500">{cat.description}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="font-semibold text-gray-700">{cat.count}</div>
              <PencilSquareIcon
                onClick={() => onEdit?.(cat)}
                className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < data.length && (
        <div className="flex justify-end">
          <button
            onClick={handleShowMore}
            className="text-blue-600 hover:underline text-sm font-medium mt-2"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryCategoryList;
