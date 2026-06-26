import cn from "@/utils/cn";

export default function Section({ children, className, id }) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-10 lg:py-16", className)}>
      {children}
    </section>
  );
}
