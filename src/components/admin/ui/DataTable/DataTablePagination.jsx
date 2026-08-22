import React from "react";

const DataTablePagination = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col gap-3 border-t border-border px-4 py-3 dark:border-border-dark sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default DataTablePagination;
