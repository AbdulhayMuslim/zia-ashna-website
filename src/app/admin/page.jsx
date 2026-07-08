import DashboardCard from "@/components/admin/DashboardCard";

const sections = [
  {
    title: "Hero",
    description: "Manage the hero section.",
    href: "/admin/hero",
  },
  {
    title: "About",
    description: "Manage the about section.",
    href: "/admin/about",
  },
  {
    title: "Activity",
    description: "Manage activities.",
    href: "/admin/activity",
  },
  {
    title: "History",
    description: "Manage history timeline.",
    href: "/admin/history",
  },
  {
    title: "Publications",
    description: "Manage publications.",
    href: "/admin/publications",
  },
  {
    title: "Contact",
    description: "Manage contact information.",
    href: "/admin/contact",
  },
  {
    title: "Header",
    description: "Manage the header.",
    href: "/admin/header",
  },
  {
    title: "Footer",
    description: "Manage the footer.",
    href: "/admin/footer",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-gray-500">
        Welcome to your website content management system.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <DashboardCard
            key={section.href}
            title={section.title}
            description={section.description}
            href={section.href}
          />
        ))}
      </div>
    </div>
  );
}
