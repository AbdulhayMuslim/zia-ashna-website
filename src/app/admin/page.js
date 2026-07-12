import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";

import { adminNav } from "@/data/admin-nav";

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Manage your website content from one place."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {adminNav
          .filter((item) => item.href !== "/admin")
          .map((item) => (
            <DashboardCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
            />
          ))}
      </div>
    </div>
  );
}
