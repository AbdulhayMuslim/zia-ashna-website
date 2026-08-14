"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function ProfilePage() {
  return <CmsEditor section="profile" title="Admin Profile" description="Manage administrator profile and notification preferences." {...cmsConfigs.profile} />;
}
