"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function HistoryPage() {
  return (
    <CmsEditor
      section="history"
      title="History Section"
      description="Manage timeline content and milestones."
      contentTitle="History introduction"
      contentDescription="Edit the section title, heading, and description displayed above the timeline."
      {...cmsConfigs.history}
    />
  );
}
