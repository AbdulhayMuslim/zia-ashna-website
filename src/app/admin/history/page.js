"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function HistoryPage() {
  return <CmsEditor section="history" title="History Section" description="Manage timeline content and milestones." {...cmsConfigs.history} />;
}
