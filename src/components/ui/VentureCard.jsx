import Link from "next/link";
import Image from "next/image";
import cn from "@/utils/cn";

export default function VentureCard({
  image,
  href,
  title,
  text,
  overlayColor = "bg-sky-700 dark:bg-[#201336]",
  className,
}) {
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  const content = (
    <>
      {/* Overlay */}
      <div
        className={cn(
          `
            absolute z-10 inset-x-0 bottom-0
            h-0
            transition-all duration-500
            group-hover:h-full
          `,
          overlayColor,
        )}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-4 lg:gap-6">
        {image && (
          <div className="rounded-full bg-gray-300 px-5 py-2 dark:bg-gray-700">
            <Image src={image} alt={title} className="w-auto h-auto max-w-45" />
          </div>
        )}

        {title && (
          <h3 className="text-center text-2xl font-semibold text-brand-primary duration-400 group-hover:text-gray-100 group-hover:dark:text-heading-dark/80 dark:text-brand-secondary">
            {title}
          </h3>
        )}

        {text && (
          <p className="text-center text-md font-light leading-relaxed text-text dark:text-text-dark/70 duration-400 group-hover:text-gray-100 group-hover:dark:text-text-dark/70">
            {text}
          </p>
        )}
      </div>
    </>
  );

  const classes = cn(
    `
      group relative overflow-hidden
      flex flex-col items-center justify-between
      gap-4 lg:gap-6
      rounded-2xl
      border-2 border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-bg-dark
      p-4 lg:p-6
    `,
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href || "#"} className={classes}>
      {content}
    </Link>
  );
}
