import { NbMenuItem, NbMenuService } from "@nebular/theme";
const userType = localStorage.getItem("role");

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "User-Management",
    icon: "compass-outline",
    link: "/pages/User-Management",
    home: true,
  },
  {
    title: "MillManagement",
    icon: "layout-outline",
    link: "/pages/Mill-Management",
    home: true,
  },
  {
    title: "UnitManagement",
    icon: "layout-outline",
    link: "/pages/Unit-Management",
    home: true,
  },
  {
    title: "AuditManagement",
    icon: "layout-outline",
    link: "/pages/Audit-Management",
    home: true,
  },
  {
    title: "Machinery Master",
    icon: "layout-outline",
    link: undefined,
    home: true,
  },
  {
    title: "Select-Audit",
    icon: "layout-outline",
    link: undefined,
    home: true,
  },
  {
    title: "Questionnaire-Management",
    icon: "layout-outline",
    link: undefined,
    home: true,
  },
  {
    title: "Observation-Management",
    icon: "layout-outline",
    link: undefined,
    home: true,
  },
  {
    title: "Intermediate-Management",
    icon: "layout-outline",
    link: undefined,
    home: true,
  },

  // {
  //   title: 'Layout',
  //   icon: 'layout-outline',
  //   children: [
  //     {
  //       title: 'Stepper',
  //       link: '/pages/layout/stepper',
  //     },
  //     {
  //       title: 'List',
  //       link: '/pages/layout/list',
  //     },
  //     {
  //       title: 'Infinite List',
  //       link: '/pages/layout/infinite-list',
  //     },
  //     {
  //       title: 'Accordion',
  //       link: '/pages/layout/accordion',
  //     },
  //     {
  //       title: 'Tabs',
  //       pathMatch: 'prefix',
  //       link: '/pages/layout/tabs',
  //     },
  //   ],
  // },
];
