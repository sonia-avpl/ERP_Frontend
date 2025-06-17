import {
  PlusIcon,
  ArrowsPointingInIcon,
  Battery100Icon,
  BoltIcon,
  CameraIcon,
  CpuChipIcon,
  FaceFrownIcon,
  GlobeAltIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

const iconList = [
  <CpuChipIcon className="w-8 h-8 text-blue-600" />,
  <BoltIcon className="w-8 h-8 text-yellow-500" />,
  <WifiIcon className="w-8 h-8 text-green-600" />,
  <CameraIcon className="w-8 h-8 text-pink-600" />,
  <Battery100Icon className="w-8 h-8 text-gray-700" />,
  <ArrowsPointingInIcon className="w-8 h-8 text-purple-600" />,
  <GlobeAltIcon className="w-8 h-8 text-indigo-600" />,
  <FaceFrownIcon className="w-8 h-8 text-red-600" />,
  <PlusIcon className="w-8 h-8 text-teal-600" />,
  <PlusIcon className="w-8 h-8 text-orange-600" />,
];

const ComponentLibrary = ({ data }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow my-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Component Categories
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data?.map((item, index) => (
            <div
              key={item._id}
              className="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-5 shadow-sm flex flex-col items-center text-center"
            >
              <div className="mb-3">
                {iconList[index % iconList.length]}
              </div>
              <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;
