"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import { Toaster } from "@/components/admin/ui/Toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((current) => !current);
  }

  // Authentication has its own full-screen presentation and must not inherit
  // dashboard navigation, spacing, or header controls.
  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
      />

      {/* Content Area */}
      <div className={sidebarCollapsed ? "transition-[margin] duration-300 lg:ml-20" : "transition-[margin] duration-300 lg:ml-72"}>
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
