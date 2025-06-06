import { motion } from 'framer-motion';
import { categories } from '../../../data/inventory';
import { PlusIcon } from '@heroicons/react/24/outline';


const InventoryCategories = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded text-gray-700">
          <PlusIcon className="h-4 w-4" />
          New
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                cat.active ? "bg-blue-50 border border-blue-500" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.description}</div>
                </div>
              </div>
              <div className="font-semibold text-gray-700">{cat.count}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryCategories;
