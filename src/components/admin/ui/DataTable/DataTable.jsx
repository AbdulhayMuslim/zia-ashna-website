import React from "react";

const DataTable = ({ children, className = "" }) => {
  return (
    <div
      className={`overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm ${className}`.trim()}
    >
      <table className="min-w-full divide-y divide-slate-200">{children}</table>
    </div>
  );
};

export default DataTable;
