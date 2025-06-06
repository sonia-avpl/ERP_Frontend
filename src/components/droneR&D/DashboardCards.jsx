// components/DashboardCards.jsx
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { dashboardStats } from "../../data/dashboardStats";
import { motion } from "framer-motion";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardStats.map((item, index) => {
        const Icon = item.icon;
        const TrendIcon =
          item.trend === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-4 rounded shadow text-gray-800 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{item.number}</div>
                <div className="text-sm text-gray-600">{item.text}</div>
              </div>
              <div className={`p-2 rounded-full ${item.iconBg}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div
              className={`mt-3 flex items-center gap-1 text-sm ${
                item.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendIcon className="h-4 w-4" />
              <span>{item.trendText}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
