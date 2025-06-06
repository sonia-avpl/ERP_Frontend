import { Battery100Icon, BoltIcon, CameraIcon, CpuChipIcon, FaceFrownIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";


export const inventoryStats = [
  {
    value: "1,248",
    label: "Total SKUs",
    trend: "up",
    trendText: "12 new this month",
  },
  {
    value: "$184,760",
    label: "Total Value",
    trend: "up",
    trendText: "3.2% from last month",
  },
  {
    value: "87%",
    label: "Accuracy Rate",
    trend: "down",
    trendText: "2% from last audit",
  },
  {
    value: "24",
    label: "Low Stock Items",
    trend: "up",
    trendText: "4 new alerts",
  },
];

export const inventoryData = [
  ["DRN-MTR-2208", "2208 Brushless Motor", "Motors", "Aisle 3, Bin 12", 42, 30, "high"],
  ["DRN-FC-V5", "Flight Controller V5", "Electronics", "Aisle 1, Bin 5", 18, 25, "medium"],
  ["DRN-BATT-4S", "4S LiPo Battery 5000mAh", "Batteries", "Aisle 2, Bin 8", 8, 15, "low"],
  ["DRN-PROP-9047", "9x4.7 Carbon Fiber Propeller", "Propellers", "Aisle 4, Bin 22", 126, 50, "high"],
  ["DRN-CAM-HD", "HD FPV Camera", "Cameras", "Aisle 1, Bin 9", 22, 20, "medium"],
];



export const categories = [
  {
    name: "Electronics",
    description: "PCBs, controllers, sensors",
    count: 248,
    icon: CpuChipIcon,
    active: true,
  },
  {
    name: "Motors & ESCs",
    description: "Brushless motors, ESCs",
    count: 142,
    icon: BoltIcon,
  },
  {
    name: "Batteries",
    description: "LiPo batteries, chargers",
    count: 86,
    icon: Battery100Icon,
  },
  {
    name: "Propellers",
    description: "Carbon fiber, plastic props",
    count: 204,
    icon: FaceFrownIcon,
  },
  {
    name: "Cameras",
    description: "FPV, HD, thermal cameras",
    count: 92,
    icon: CameraIcon,
  },
  {
    name: "Frames & Structures",
    description: "Carbon fiber frames, arms",
    count: 176,
    icon: CubeTransparentIcon ,
  },
];