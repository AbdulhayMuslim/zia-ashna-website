"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
import PasswordSettings from "@/components/admin/profile/PasswordSettings";
export default function ProfilePage() {
  return <CmsEditor section="profile" title="Admin Profile" description="Manage administrator profile and security settings." {...cmsConfigs.profile}><PasswordSettings /></CmsEditor>;
}
