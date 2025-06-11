// data/dashboardStats.js
import {
  FolderIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  TruckIcon,
  PuzzlePieceIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export const dashboardStats = [
  {
    number: "12",
    text: "Active Projects",
    icon: FolderIcon,
    iconBg: "bg-blue-500",
    trend: "up",
    trendText: "3 new this month",
  },
  {
    number: "42",
    text: "Prototypes",
    icon: CubeIcon,
    iconBg: "bg-green-500",
    trend: "up",
    trendText: "5 new in testing",
  },
  {
    number: "8",
    text: "Critical Issues",
    icon: ExclamationTriangleIcon,
    iconBg: "bg-orange-500",
    trend: "down",
    trendText: "3 resolved today",
  },
  {
    number: "86%",
    text: "Testing Success",
    icon: BeakerIcon,
    iconBg: "bg-red-500",
    trend: "up",
    trendText: "2% improvement",
  },
];

export const droneModule=[
    {
    title: "Project Management",
    desc: "Track R&D projects, timelines, resources, and milestones",
    icon: ClipboardDocumentCheckIcon,
    // path:"/inventory"
  },
  {
    title: "Component Design",
    desc: "Design and document drone components and assemblies",
    icon: PuzzlePieceIcon,
        path:"/component-design"
  },
  {
    title: "Prototype Management",
    desc: "Track prototype builds, versions, and testing status",
    icon: CubeIcon,
        path:"/prototype-management"
  },
  {
    title: "Testing & Validation",
    desc: "Plan and document flight tests, stress tests, and validations",
    icon: BeakerIcon,
        path:"/testing-validation"
  },
  {
    title: "Compliance & Docs",
    desc: "Manage regulatory compliance and documentation",
    icon: DocumentTextIcon,
        path:"/compliance-docs"
  },
  {
    title: "Inventory",
    desc: "Track R&D components, materials, and supplies",
    icon: ArchiveBoxIcon,
        path:"/inventory"
  },
  {
    title: "Supply Chain",
    desc: "Manage suppliers, orders, and component sourcing",
    icon: TruckIcon,
        path:"/inventory"
  },
  {
    title: "Quality Control",
    desc: "Track defects, issues, and quality metrics",
    icon: WrenchScrewdriverIcon,
        path:"/inventory"
  },
]

