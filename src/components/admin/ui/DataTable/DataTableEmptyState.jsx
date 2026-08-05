import React from "react";

const DataTableEmptyState = ({
  title = "No data",
  description = "There are no records to display.",
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
      {children}
    </div>
  );
};

export default DataTableEmptyState;
