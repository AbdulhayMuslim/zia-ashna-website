import {
  House,
  User,
  BookOpen,
  Mail,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

export const navigationLinks = [
  {
    href: "/",
    icon: House,
    label: "Home",
  },
  {
    href: "/#about",
    icon: User,
    label: "About",
  },
  {
    href: "/#activity",
    icon: BriefcaseBusiness,
    label: "Activity",
  },
  {
    href: "/#history",
    icon: Building2,
    label: "History",
  },

  {
    href: "/#publications",
    icon: BookOpen,
    label: "Publications",
  },
  {
    href: "/#contact",
    icon: Mail,
    label: "Contact",
  },
];
