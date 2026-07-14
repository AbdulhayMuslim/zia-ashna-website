import cn from "@/utils/cn";

export default function FormActions({ children, className, align = "end" }) {
  const alignClass =
    {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    }[align] || "justify-end";

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap items-center gap-3",
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
