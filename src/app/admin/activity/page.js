"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function ActivityPage() {
  return (
    <CmsEditor
      section="activity"
      title="Activity Section"
      description="Manage homepage activity cards."
      viewHref="/#activity"
      contentTitle="Activity introduction"
      contentDescription="Edit the section title, heading, and description shown above the activity cards."
      {...cmsConfigs.activity}
    />
  );
}
