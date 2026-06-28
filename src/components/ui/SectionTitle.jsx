import cn from "@/utils/cn";
import FadeDown from "../animations/FadeDown";

export default function SectionTitle({
  title,
  children,
  as: Tag = "h2",
  className,
}) {
  const content = title || children;

  if (!content) return null;

  return (
    <FadeDown>
      <Tag
        className={cn(
          `
          inline-block
          w-fit
          rounded-full

          px-6 py-1.5

          text-sm md:text-lg font-medium

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
    </FadeDown>
  );
}
