import { ChevronRight } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, onClick }) => (
  <div
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
    onClick={onClick}
  >
    {Icon && (
      <Icon className="w-12 h-12 text-indigo-500 mb-3" strokeWidth={1.5} />
    )}
    <h3 className="text-lg font-semibold text-gray-700 mb-1 text-center">
      {title}
    </h3>
    <p className="text-4xl font-extrabold text-indigo-700">{value}</p>
    <div className="mt-3 text-sm text-indigo-500 flex items-center">
      View Details <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </div>
);

export default StatsCard;
