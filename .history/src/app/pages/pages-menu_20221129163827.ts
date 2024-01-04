import { NbMenuItem, NbMenuService } from "@nebular/theme";
const userType = localStorage.getItem("role");

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "User-Management",
    icon: { icon: "people-outline", pack: "eva" },
    link: "/pages/User-Management",
    home: true,
  },
  {
    title: "MillManagement",
    icon: { icon: "home-outline", pack: "eva" },
    link: "/pages/Mill-Management",
    home: true,
  },
  {
    title: "UnitManagement",
    icon: { icon: "keypad-outline", pack: "eva" },
    link: "/pages/Unit-Management",
    home: true,
  },
  {
    title: "AuditManagement",
    icon: { icon: "tv-outline", pack: "eva" },
    link: "/pages/Audit-Management",
    home: true,
  },
  {
    title: "Machinery Master",
    icon: { icon: "settings-2-outline", pack: "eva" },
    link: undefined,
    home: true,
  },
  {
    title: "Select-Audit",
    icon: { icon: "inbox-outline", pack: "eva" },
    link: undefined,
    home: true,
  },
  {
    title: "Questionnaire-Management",
    icon: { icon: "clipboard-outline", pack: "eva" },
    link: undefined,
    home: true,
  },
  {
    title: "Observation-Management",
    icon: { icon: "monitor-outline", pack: "eva" },
    link: undefined,
    home: true,
  },
  {
    title: "Intermediate-Management",
    icon: { icon: "globe-outline", pack: "eva" },
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
