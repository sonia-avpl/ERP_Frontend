import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CubeIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  PuzzlePieceIcon,
  TruckIcon,
  ArchiveBoxIcon,
  ShieldCheckIcon,
  FolderIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";


export const topCommonMenus = [
  {
    section: "Main",
    items: [
      {
        name: "Dashboard",
        to: "/",
        icon: <HomeIcon className="h-5 w-5" />,
      },
    ],
  },
];

export const bottomCommonMenus = [
  {
    section: "Administration",
    items: [
      {
        name: "User Management",
        to: "/user-management",
        icon: <UserGroupIcon className="h-5 w-5" />,
      },
      {
        name: "Project Management",
        to: "/project-managment",
        icon: <UserPlusIcon className="h-5 w-5" />,
      },
      {
        name: "Settings",
        to: "/settings",
        icon: <Cog6ToothIcon className="h-5 w-5" />,
      },
    ],
  },
];


export const menuConfig = {
  "R&D": [
    {
      section: "R&D Modules",
      items: [
        {
          name: "Component Design",
          to: "/component-design",
          icon: <CubeIcon className="h-5 w-5" />,
        },
        {
          name: "Prototype Management",
          to: "/prototype-management",
          icon: <BeakerIcon className="h-5 w-5" />,
        },
        {
          name: "Testing & Validation",
          to: "/testing-validation",
          icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
        },
        {
          name: "Compliance & Docs",
          to: "/compliance-docs",
          icon: <PuzzlePieceIcon className="h-5 w-5" />,
        },
        {
          name: "Reporting",
          to: "#",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },
    {
      section: "Supply Chain",
      items: [
        {
          name: "Supply Chain",
          to: "/supply-chain-dashboard",
          icon: <TruckIcon className="h-5 w-5" />,
        },
        {
          name: "Inventory & SCM",
          to: "/inventory",
          icon: <ArchiveBoxIcon className="h-5 w-5" />,
        },
        {
          name: "Quality Control",
          to: "#",
          icon: <ShieldCheckIcon className="h-5 w-5" />,
        },
        {
          name: "Reporting",
          to: "#",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
  HR: [
    {
      section: "HR Tools",
      items: [
        {
          name: "Employee Records",
          to: "/employee-records",
          icon: <UserGroupIcon className="h-5 w-5" />,
        },
        {
          name: "Leave Management",
          to: "/leave-management",
          icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
  Finance: [
    {
      section: "Finance Panel",
      items: [
        {
          name: "Invoices",
          to: "/invoices",
          icon: <FolderIcon className="h-5 w-5" />,
        },
        {
          name: "Budget Tracking",
          to: "/budget-tracking",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
};
