"use client";
import CmsEditor from "@/components/admin/cms/CmsEditor";
import { cmsConfigs } from "@/components/admin/cms/config";
export default function ContactPage() {
  return <CmsEditor section="contact" title="Contact Section" description="Manage contact content and contact cards." {...cmsConfigs.contact} />;
}
