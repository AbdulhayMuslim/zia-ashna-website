// src/data/admin-nav.js

import {
  LayoutDashboard,
  MonitorSmartphone,
  UserRound,
  Activity,
  History,
  BookOpen,
  Images,
  Mail,
} from "lucide-react";

export const adminNav = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Manage website content, images, and brand logos.",
  },
  {
    title: "Hero Section",
    href: "/admin/hero",
    icon: MonitorSmartphone,
    description: "Manage hero content and images.",
  },
  {
    title: "About Section",
    href: "/admin/about",
    icon: UserRound,
    description: "Manage about content and images.",
  },
  {
    title: "Activity Section",
    href: "/admin/activity",
    icon: Activity,
    description: "Manage activity content and images.",
  },
  {
    title: "History Section",
    href: "/admin/history",
    icon: History,
    description: "Manage history content and images.",
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: BookOpen,
    description: "Manage blog content and images.",
    children: [
      { title: "All Posts", href: "/admin/blog" },
      { title: "Categories", href: "/admin/categories" },
      { title: "Tags", href: "/admin/tags" },
    ],
  },
  {
    title: "Contact Section",
    href: "/admin/contact",
    icon: Mail,
    description: "Manage contact content and images.",
  },
  {
    title: "Media Library",
    href: "/admin/media",
    icon: Images,
    description: "Manage uploaded media files.",
    dividerBefore: true,
  },
];

export const cmsConfig = {
  name: "ASHNA CMS",
  description: "Content Management System",
};
