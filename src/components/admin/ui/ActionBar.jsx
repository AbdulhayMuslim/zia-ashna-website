import cn from "@/utils/cn";

export default function ActionBar({ children, className }) {
  return (
    <div className={cn("flex flex-wrap justify-end gap-3", className)}>
      {children}
    </div>
  );
}
