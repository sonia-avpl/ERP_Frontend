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

const components = [
  {
    icon: <CpuChipIcon className="w-8 h-8 text-blue-600" />,
    title: "Flight Controller",
    description: "Main control board",
  },
  {
    icon: <BoltIcon className="w-8 h-8 text-yellow-500" />,
    title: "ESC",
    description: "Electronic Speed Controller",
  },
  {
    icon: <WifiIcon className="w-8 h-8 text-green-600" />,
    title: "Receiver",
    description: "Radio signal receiver",
  },
  {
    icon: <CameraIcon className="w-8 h-8 text-pink-600" />,
    title: "FPV Camera",
    description: "First-person view camera",
  },
  {
    icon: <Battery100Icon className="w-8 h-8 text-gray-700" />,
    title: "LiPo Battery",
    description: "Power source",
  },
  {
    icon: <ArrowsPointingInIcon className="w-8 h-8 text-purple-600" />,
    title: "Gimbal",
    description: "Camera stabilization",
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8 text-indigo-600" />,
    title: "GPS Module",
    description: "Position tracking",
  },
  {
    icon: <FaceFrownIcon className="w-8 h-8 text-red-600" />,
    title: "Propellers",
    description: "Carbon fiber props",
  },
];

const ComponentLibrary = () => {
 
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow my-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Component Library
          </h3>
         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-5 shadow-sm flex flex-col items-center text-center"
            >
              <div className="mb-3">{icon}</div>
              <h4 className="text-lg font-medium text-gray-800">{title}</h4>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;
