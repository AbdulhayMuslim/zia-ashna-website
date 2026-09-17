import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, requireAdmin } from "@/lib/admin-auth";
import AdminLayout from "@/components/admin/layout/AdminLayout";
export default async function Layout({ children }) {
  const isLogin = (await headers()).get("x-admin-pathname") === "/admin/login";
  if (isLogin) {
    if (await isAdminAuthenticated()) redirect("/admin");
  } else {
    await requireAdmin();
  }
  return <AdminLayout>{children}</AdminLayout>;
}
