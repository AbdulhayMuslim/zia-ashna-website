"use client";

import DataTableEmptyState from "./DataTableEmptyState";
import cn from "@/utils/cn";

export default function DataTable({
  columns = [],
  data = [],
  keyField = "id",
  loading = false,
  fixedLayout = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no records to display.",
}) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-10 rounded-lg bg-muted dark:bg-muted-dark" />

          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-12 rounded-lg bg-muted dark:bg-muted-dark"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <DataTableEmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
      <div className={cn("overflow-x-auto", fixedLayout && "lg:overflow-x-hidden")}>
        <table className={cn(
          "min-w-full divide-y divide-border dark:divide-border-dark",
          fixedLayout && "min-w-[760px] lg:table-fixed lg:min-w-full",
        )}>
          <thead className="bg-muted dark:bg-muted-dark">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width || "auto" }}
                  className={`${fixedLayout ? "px-3" : "px-6"} py-4 text-xs font-semibold uppercase tracking-wider text-heading dark:text-heading-dark ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border dark:divide-border-dark">
            {data.map((row) => (
              <tr
                key={row[keyField]}
                className="transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${fixedLayout ? "px-3" : "px-6"} py-4 text-sm text-body dark:text-body-dark ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                          ? "text-right"
                          : "text-left"
                    }`}
                  >
                    {column.render
                      ? column.render(row)
                      : (row[column.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
