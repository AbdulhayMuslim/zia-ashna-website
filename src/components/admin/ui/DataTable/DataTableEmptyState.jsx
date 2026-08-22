import React from "react";

const DataTableEmptyState = ({
  title = "No data",
  description = "There are no records to display.",
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center dark:border-border-dark dark:bg-card-dark">
      <h3 className="text-sm font-semibold text-heading dark:text-heading-dark">{title}</h3>
      <p className="text-sm text-text dark:text-text-dark">{description}</p>
      {children}
    </div>
  );
};

export default DataTableEmptyState;
