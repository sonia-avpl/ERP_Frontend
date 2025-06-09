import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import NewItemModal from "../../modals/inventory/NewItemModal";


const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const InventoryHeader = ({refetch}) => {
  const [showModal, setShowModal] = useState(false);

  const buttons = [
    {
      label: "New Item",
      icon: PlusIcon,
      className: "bg-blue-600 hover:bg-blue-700",
      onClick: () => setShowModal(true),
    },
    {
      label: "Receive Stock",
      icon: ArrowUpTrayIcon,
      className: "bg-green-600 hover:bg-green-700",
    },
    {
      label: "Issue Stock",
      icon: ArrowDownTrayIcon,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "Cycle Count",
      icon: ArrowPathIcon,
      className: "bg-gray-500 hover:bg-gray-600",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Drone Component Inventory
          </h2>
          <p className="text-gray-600">
            Real-time tracking of drone parts and materials
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {buttons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <motion.button
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                onClick={btn.onClick}
                className={`flex items-center gap-1 text-sm text-white px-3 py-1.5 rounded transition ${btn.className}`}
              >
                <Icon className="h-4 w-4" />
                {btn.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal Component */}
      <NewItemModal isOpen={showModal} onClose={() => setShowModal(false)} refetch={refetch}/>
    </>
  );
};

export default InventoryHeader;
