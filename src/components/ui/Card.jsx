import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import cn from "@/utils/cn";

export default function Card({
  icon,
  title,
  as: Tag = "h4",
  content,
  btn,
  number,
  className,
  overlayColor = "bg-brand-primary/20 dark:bg-orange-900",
}) {
  const Icon = typeof icon !== "string" ? icon : null;

  return (
    <article
      className={cn(
        `
          group relative overflow-hidden
          rounded-2xl
          bg-bg dark:bg-bg-dark
          p-8
          shadow-[0_0_30px_rgba(0,0,0,0.08)]
          select-none
        `,
        className,
      )}
    >
      {/* Overlay */}
      <div
        className={cn(
          `
            absolute left-0 top-0 z-10 w-full
            h-0
            transition-all duration-500
            md:group-hover:h-full
          `,
          overlayColor,
        )}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start gap-3">
        {/* Icon */}
        {icon &&
          (typeof icon === "string" ? (
            <Image
              src={icon}
              alt={`${title} icon`}
              width={60}
              height={60}
              className="
                h-15 w-15 object-contain shrink-0
                transition-transform duration-300
                md:group-hover:-translate-y-2
              "
            />
          ) : (
            <div className="w-full flex items-center justify-between">
              <Icon
                size={60}
                strokeWidth={1.75}
                className="
                shrink-0
                text-brand-primary dark:text-brand-secondary
                transition-transform duration-300
                md:group-hover:-translate-y-2
              "
              />

              <div className="font-semibold text-5xl lg:text-6xl text-text-muted/15">
                {number}
              </div>
            </div>
          ))}

        {/* Title */}
        <Tag className="font-semibold text-lg text-heading dark:text-heading-dark">
          {title}
        </Tag>

        {/* Description */}
        <p className="text-md leading-relaxed text-heading/80 dark:text-text-muted-dark">
          {content}
        </p>

        {/* Button */}
        {btn?.href && btn?.label && (
          <Link
            href={btn.href}
            className="
              mt-2 inline-flex items-center gap-2
              text-sm font-medium
              text-brand-primary
              dark:text-brand-secondary
              transition-all duration-300
              md:hover:translate-x-1
              md:hover:text-brand-secondary
              dark:md:hover:text-brand-primary
            "
          >
            <span>{btn.label}</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}
