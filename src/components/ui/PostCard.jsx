"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function PostCard({ image, category, date, title, href }) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");

  const content = (
    <article
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      h-[420px]
      w-full
      cursor-pointer
    "
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-linear-to-t
          from-black/90
          via-black/40
          to-transparent
        "
      />

      {/* Category */}
      {category && (
        <div
          className="
            absolute
            top-5
            left-5
            z-20

            rounded-full

            bg-brand-primary
            dark:bg-brand-secondary

            px-4
            py-1.5

            text-xs
            font-medium
            text-white
          "
        >
          {category}
        </div>
      )}

      {/* Content */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          p-6
          flex
          flex-col
          gap-4
        "
      >
        <h3
          className="
            text-white
            text-2xl
            font-semibold
            leading-tight

            line-clamp-3
          "
        >
          {title}
        </h3>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              text-sm
              text-white/80
            "
          >
            <CalendarDays size={16} />

            <span>{date}</span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2

              text-sm
              text-white

              transition-all
              duration-300

              group-hover:translate-x-1
            "
          >
            Read More
            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </div>
    </article>
  );

  if (!href) return content;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
