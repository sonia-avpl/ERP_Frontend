const SkuCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl">
        {icon}
      </div>
    </div>
  );
};

export default SkuCard;
