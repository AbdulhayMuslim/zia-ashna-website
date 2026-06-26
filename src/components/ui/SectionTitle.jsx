import cn from "@/utils/cn";

export default function SectionTitle({
  title,
  children,
  as: Tag = "h2",
  className,
}) {
  const content = title || children;

  if (!content) return null;

  return (
    <Tag
      className={cn(
        `
          inline-block
          w-fit
          rounded-tl-full rounded-br-full

          px-8 py-1.5

          text-md md:text-lg font-medium
          lg:text-2xl lg:font-semibold

          bg-brand-primary/15
          text-brand-primary

          dark:bg-brand-secondary/20
          dark:text-brand-secondary
        `,
        className,
      )}
    >
      {content}
    </Tag>
  );
}
