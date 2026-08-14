"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function ActivityPage() {
  return <CmsEditor section="activity" title="Activity Section" description="Manage homepage activity cards." {...cmsConfigs.activity} />;
}
