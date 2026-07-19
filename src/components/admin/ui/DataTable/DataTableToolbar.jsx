import React from "react";

const DataTableToolbar = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col gap-3 rounded-t-lg border-b border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default DataTableToolbar;
