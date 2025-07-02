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
  AcademicCapIcon,
  Squares2X2Icon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentListIcon,
  DocumentIcon,
  ReceiptRefundIcon,
  ArchiveBoxXMarkIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
//   Squares2X2Icon,
//   AdjustmentsHorizontalIcon,
//   ClipboardDocumentListIcon,
//   DocumentIcon,
//   ReceiptRefundIcon,
//   ArchiveBoxXMarkIcon,
//   CubeTransparentIcon,
// } from "@heroicons/react/24/outline";
import { SiAmazondocumentdb } from "react-icons/si";
import { FaStore } from "react-icons/fa";
import {
  BanknoteIcon,
  CreditCardIcon,
  FileTextIcon,
  PackageIcon,
  RefreshCcwIcon,
  RotateCcwIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckElectricIcon,
  UsersIcon,
} from "lucide-react";
import { PiCubeTransparentLight } from "react-icons/pi";
import { HiAdjustmentsHorizontal, HiOutlineSquares2X2 } from "react-icons/hi2";

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
      // {
      //   name: "User Management",
      //   to: "/user-management",
      //   icon: <UserGroupIcon className="h-5 w-5" />,
      // },
      // {
      //   name: "Project Management",
      //   to: "/project-managment",
      //   icon: <UserPlusIcon className="h-5 w-5" />,
      // },
      {
        name: "Settings",
        to: "/settings",
        icon: <Cog6ToothIcon className="h-5 w-5" />,
      },
    ],
  },
];

export const menuConfig = {
  "R&D Manager": [
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
          to: "/reporting",
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
          to: "quality-control",
          icon: <ShieldCheckIcon className="h-5 w-5" />,
        },
        {
          name: "Reporting",
          to: "reporting-supply-chain",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
  "Supply Chain": [
    {
      section: "Supply Chain",
      items: [
        {
          name: "SKU Management ",
          to: "/sku-management",
          icon: <SiAmazondocumentdb className="h-5 w-5" />,
        },
        {
          name: "Procurement",
          to: "/procurement",
          icon: <FaStore className="h-5 w-5" />,
        },
        {
          name: "GRN Processing",
          to: "/grn-processing",
          icon: <TruckIcon className="h-5 w-5" />,
        },
        {
          name: "Quality Control",
          to: "quality-control",
          icon: <ShieldCheckIcon className="h-5 w-5" />,
        },

        {
          name: "Inventory",
          icon: <ArchiveBoxXMarkIcon className="h-5 w-5" />,
          children: [
            {
              name: "Items",
              to: "/inventory/items",
              icon: <PiCubeTransparentLight className="h-4 w-4" />,
            },
            {
              name: "Item Groups",
              to: "/inventory/item-groups",
              icon: <HiOutlineSquares2X2 className="h-4 w-4" />,
            },
            {
              name: "Inventory Adjustments",
              to: "/inventory/adjustments",
              icon: <HiAdjustmentsHorizontal className="h-4 w-4" />,
            },
          ],
        },

        // {
        //   name: "Sales",
        //   icon: <ShoppingCartIcon className="h-5 w-5" />,
        //   children: [
        //     {
        //       name: "Customers",
        //       to: "/sales/customers",
        //       icon: <UsersIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Sales Orders",
        //       to: "/sales/orders",
        //       icon: <ClipboardDocumentListIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Packages",
        //       to: "/sales/packages",
        //       icon: <PackageIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Shipments",
        //       to: "/sales/shipments",
        //       icon: <TruckIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Delivery Challans",
        //       to: "/sales/delivery-challans",
        //       icon: <DocumentIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Invoices",
        //       to: "/sales/invoices",
        //       icon: <DocumentIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Payments Received",
        //       to: "/sales/payments-received",
        //       icon: <CreditCardIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Sales Returns",
        //       to: "/sales/returns",
        //       icon: <ReceiptRefundIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Credit Notes",
        //       to: "/sales/credit-notes",
        //       icon: <RefreshCcwIcon className="h-4 w-4" />,
        //     },
        //   ],
        // },

        {
          name: "Purchases",
          icon: <ShoppingBagIcon className="h-5 w-5" />,
          children: [
            {
              name: "Vendors",
              to: "/purchases/vendors",
              icon: <UsersIcon className="h-4 w-4" />,
            },
            {
              name: "Purchase Orders",
              to: "/purchases/orders",
              icon: <ClipboardDocumentListIcon className="h-4 w-4" />,
            },
            {
              name: "Purchase Receives",
              to: "/purchases/receives",
              icon: <TruckElectricIcon className="h-4 w-4" />,
            },
            {
              name: "Bills",
              to: "/purchases/bills",
              icon: <FileTextIcon className="h-4 w-4" />,
            },
            // {
            //   name: "Payments Made",
            //   to: "/purchases/payments",
            //   icon: <BanknoteIcon className="h-4 w-4" />,
            // },
            // {
            //   name: "Vendor Credits",
            //   to: "/purchases/credits",
            //   icon: <RotateCcwIcon className="h-4 w-4" />,
            // },
          ],
        },

        {
          name: "Reporting",
          to: "reporting-supply-chain",
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
  Principal: [
    {
      section: "Principal Panel",
      items: [
        {
          name: "Student List",
          to: "/all-students",
          icon: <FolderIcon className="h-5 w-5" />,
        },
        {
          name: "New Admission",
          to: "/admission-form",
          icon: <AcademicCapIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
  Admin: [
    {
      section: "Principal Panel",
      items: [
        {
          name: "Student List",
          to: "/all-students",
          icon: <FolderIcon className="h-5 w-5" />,
        },
        {
          name: "New Admission",
          to: "/admission-form",
          icon: <AcademicCapIcon className="h-5 w-5" />,
        },
      ],
    },
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
          to: "/reporting",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },

    {
      section: "Supply Chain",
      items: [
        {
          name: "SKU Management ",
          to: "/sku-management",
          icon: <SiAmazondocumentdb className="h-5 w-5" />,
        },
        {
          name: "Procurement",
          to: "/procurement",
          icon: <FaStore className="h-5 w-5" />,
        },
        {
          name: "GRN Processing",
          to: "/grn-processing",
          icon: <TruckIcon className="h-5 w-5" />,
        },
        {
          name: "Quality Control",
          to: "quality-control",
          icon: <ShieldCheckIcon className="h-5 w-5" />,
        },

        {
          name: "Inventory",
          icon: <ArchiveBoxXMarkIcon className="h-5 w-5" />,
          children: [
            {
              name: "Items",
              to: "/inventory/items",
              icon: <PiCubeTransparentLight className="h-4 w-4" />,
            },
            {
              name: "Item Groups",
              to: "/inventory/item-groups",
              icon: <HiOutlineSquares2X2 className="h-4 w-4" />,
            },
            {
              name: "Inventory Adjustments",
              to: "/inventory/adjustments",
              icon: <HiAdjustmentsHorizontal className="h-4 w-4" />,
            },
          ],
        },

        // {
        //   name: "Sales",
        //   icon: <ShoppingCartIcon className="h-5 w-5" />,
        //   children: [
        //     {
        //       name: "Customers",
        //       to: "/sales/customers",
        //       icon: <UsersIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Sales Orders",
        //       to: "/sales/orders",
        //       icon: <ClipboardDocumentListIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Packages",
        //       to: "/sales/packages",
        //       icon: <PackageIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Shipments",
        //       to: "/sales/shipments",
        //       icon: <TruckIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Delivery Challans",
        //       to: "/sales/delivery-challans",
        //       icon: <DocumentIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Invoices",
        //       to: "/sales/invoices",
        //       icon: <DocumentIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Payments Received",
        //       to: "/sales/payments-received",
        //       icon: <CreditCardIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Sales Returns",
        //       to: "/sales/returns",
        //       icon: <ReceiptRefundIcon className="h-4 w-4" />,
        //     },
        //     {
        //       name: "Credit Notes",
        //       to: "/sales/credit-notes",
        //       icon: <RefreshCcwIcon className="h-4 w-4" />,
        //     },
        //   ],
        // },

        {
          name: "Purchases",
          icon: <ShoppingBagIcon className="h-5 w-5" />,
          children: [
            {
              name: "Vendors",
              to: "/purchases/vendors",
              icon: <UsersIcon className="h-4 w-4" />,
            },
            {
              name: "Purchase Orders",
              to: "/purchases/orders",
              icon: <ClipboardDocumentListIcon className="h-4 w-4" />,
            },
            {
              name: "Purchase Receives",
              to: "/purchases/receives",
              icon: <TruckElectricIcon className="h-4 w-4" />,
            },
            {
              name: "Bills",
              to: "/purchases/bills",
              icon: <FileTextIcon className="h-4 w-4" />,
            },
            {
              name: "Payments Made",
              to: "/purchases/payments",
              icon: <BanknoteIcon className="h-4 w-4" />,
            },
            {
              name: "Vendor Credits",
              to: "/purchases/credits",
              icon: <RotateCcwIcon className="h-4 w-4" />,
            },
          ],
        },

        {
          name: "Reporting",
          to: "reporting-supply-chain",
          icon: <ChartBarIcon className="h-5 w-5" />,
        },
      ],
    },
  ],
};
