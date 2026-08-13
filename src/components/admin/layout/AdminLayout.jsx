"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import { Toaster } from "@/components/admin/ui/Toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication has its own full-screen presentation and must not inherit
  // dashboard navigation, spacing, or header controls.
  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="lg:ml-72">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
