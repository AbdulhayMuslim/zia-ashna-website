import cn from "@/utils/cn";

export default function PageContainer({ children, className }) {
  return (
    <div className={cn("mx-auto max-w-7xl space-y-8", className)}>
      {children}
    </div>
  );
}
