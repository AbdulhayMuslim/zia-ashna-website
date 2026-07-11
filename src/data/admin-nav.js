// src/data/admin-nav.js

import {
  LayoutDashboard,
  MonitorSmartphone,
  UserRound,
  Activity,
  History,
  BookOpen,
  Mail,
} from "lucide-react";

export const adminNav = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Hero Section",
    href: "/admin/hero",
    icon: MonitorSmartphone,
  },
  {
    title: "About Section",
    href: "/admin/about",
    icon: UserRound,
  },
  {
    title: "Activity Section",
    href: "/admin/activity",
    icon: Activity,
  },
  {
    title: "History Section",
    href: "/admin/history",
    icon: History,
  },
  {
    title: "Publications Section",
    href: "/admin/publications",
    icon: BookOpen,
  },
  {
    title: "Contact Section",
    href: "/admin/contact",
    icon: Mail,
  },
];

export const cmsConfig = {
  name: "ASHNA CMS",
  description: "Content Management System",
};
