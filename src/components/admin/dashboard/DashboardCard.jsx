import Link from "next/link";
import { ArrowRight } from "lucide-react";

import cn from "@/utils/cn";

export default function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg",
        "dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-primary/40",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Icon className="h-6 w-6" />
        </div>

        <ArrowRight
          className="
            h-5 w-5
            text-gray-400
            transition-transform
            duration-300
            group-hover:translate-x-1
            group-hover:text-brand-primary
          "
        />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
