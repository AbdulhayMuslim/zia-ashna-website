"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function SettingsPage() {
  return <CmsEditor section="settings" title="Settings" description="Manage site identity, SEO, contact details, and social links." {...cmsConfigs.settings} />;
}
