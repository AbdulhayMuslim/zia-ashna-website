import Link from "next/link";
import { Eye } from "lucide-react";

export default function ViewSectionLink({ href, label = "View section" }) {
  return (
    <Link href={href} target="_blank" className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-border bg-card px-4 text-sm font-medium text-heading transition hover:border-brand-primary/40 hover:bg-brand-primary/10 dark:bg-gray-800 dark:text-heading-dark">
      <Eye className="h-4 w-4" /> {label}
    </Link>
  );
}
