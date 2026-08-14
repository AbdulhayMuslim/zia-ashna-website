"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

import { adminNav, cmsConfig } from "@/data/admin-nav";
import cn from "@/utils/cn";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen, collapsed, onToggleCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSidebarOpen(false);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50",
          "flex h-screen w-72 flex-col",
          "border-r border-gray-200",
          "bg-white dark:border-gray-700 dark:bg-gray-800",
          "transition-[transform,width] duration-300",
          collapsed ? "lg:w-20" : "lg:w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo Area */}
        <div className={cn("relative flex h-16 shrink-0 items-center border-b border-gray-200 px-6 dark:border-gray-700", collapsed && "lg:justify-center lg:px-2")}>
          <div className={cn("min-w-0 pr-9", collapsed && "lg:hidden")}>
            <h1 className="truncate text-lg font-bold leading-5 text-gray-900 dark:text-white">
              {cmsConfig.name}
            </h1>

            <p className="mt-0.5 truncate text-xs leading-4 text-gray-500 dark:text-gray-400">
              {cmsConfig.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gray-600 outline-none transition hover:bg-brand-primary/10 hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:text-gray-300 lg:flex",
              collapsed && "lg:static lg:translate-y-0",
            )}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              rounded-lg
              p-2
              hover:bg-gray-100
              dark:hover:bg-gray-700
              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className={cn("flex-1 overflow-y-auto px-4 py-6", collapsed && "lg:px-2")}>
          <ul className="space-y-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    aria-label={collapsed ? item.title : undefined}
                    title={collapsed ? item.title : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      collapsed && "lg:justify-center lg:px-0",
                      active
                        ? "bg-brand-primary text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className={cn(collapsed && "lg:hidden")}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-gray-200 p-4 dark:border-gray-700", collapsed && "lg:p-2")}>
          <button
            type="button"
            onClick={handleLogout}
            aria-label={collapsed ? "Logout" : undefined}
            title={collapsed ? "Logout" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={cn(collapsed && "lg:hidden")}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
