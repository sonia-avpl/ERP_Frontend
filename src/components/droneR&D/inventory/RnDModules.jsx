import { motion } from "framer-motion";
import { droneModule } from "../../../data/dashboardStats";
import { Link } from "react-router-dom";
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};
const RnDModules = () => {
  return (
    <div className="bg-white rounded shadow p-6 my-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">R&D Modules</h2>
        <a href="#" className="text-blue-600 font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {droneModule.map((mod, index) => {
          const Icon = mod.icon;
          return (
            <Link to={mod.path}>
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 rounded p-4 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className=" flex items-center justify-center">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-md font-semibold text-center text-gray-800 mb-1">
                  {mod.title}
                </h3>
                <p className="text-sm text-center text-gray-600 h-12">{mod.desc}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RnDModules;
