import cn from "@/utils/cn";

export default function Container({ children, className }) {
  return (
    <div className={cn("mx-auto max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
