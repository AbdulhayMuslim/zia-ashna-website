import Link from "next/link";
import cn from "@/utils/cn";
import FadeUp from "../animations/FadeUp";

export default function Button({
  href,
  label,
  icon: Icon,
  onClick,
  className,
  children,
  ...props
}) {
  const classes = cn(
    `
      inline-flex w-fit items-center justify-center gap-2
      rounded-tr-full rounded-bl-full
      px-6 py-2
      text-sm font-light text-white
      bg-brand-primary
      hover:bg-brand-secondary

      dark:bg-brand-secondary
      dark:hover:bg-brand-primary

      duration-300
      hover:-translate-y-[5px]

      cursor-pointer
      select-none
    `,
    className,
  );

  const content = (
    <>
      {label || children}
      {Icon && <Icon size={16} aria-hidden="true" />}
    </>
  );

  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  // External Links
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Internal Links & Anchor Links
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  // Button
  return (
    <FadeUp>
      <button type="button" onClick={onClick} className={classes} {...props}>
        {content}
      </button>
    </FadeUp>
  );
}
