"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AdminLogo from "./AdminLogo";
import { adminNavigation } from "@/config/adminNavigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r bg-card">
      <div className="flex h-16 items-center border-b px-5">
        <AdminLogo />
      </div>

      <div className="space-y-6 p-4">
        {adminNavigation.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h3>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
                    ${
                      active
                        ? "bg-brand-primary text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
