import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PostCard({
  image,
  date,
  category,
  title,
  text,
  btn,
  href,
}) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");

  const ButtonContent = btn && (
    <div
      className="
        group/btn
        inline-flex
        items-center
        gap-2
        rounded-lg
        bg-brand-primary/10
        px-4
        py-2
        text-brand-primary
        font-medium
        transition-colors
        duration-300
        hover:bg-brand-primary
        hover:text-bg
      "
    >
      <span className="text-sm">{btn}</span>

      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover/btn:translate-x-1"
      />
    </div>
  );

  const Card = (
    <article
      className="
        group
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border-2
        border-brand-primary/30
        bg-bg
        transition-all
        duration-300
        hover:-translate-y-1
        dark:border-brand-primary/20
        dark:bg-bg-dark
      "
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title || "Blog post"}
            sizes="(max-width:768px)100vw,(max-width:1024px)50vw,400px"
            fill
            className="object-cover duration-400 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-primary/10 text-sm text-brand-primary">
            No featured image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Top Content */}
        <div className="flex flex-col gap-4">
          <h3
            className="
              line-clamp-2
              text-xl
              font-semibold
              text-heading-soft
              transition-colors
              duration-300
              group-hover:text-brand-primary
              dark:text-heading-dark/80
            "
          >
            {title}
          </h3>

          <p
            className="
              line-clamp-3
              text-md
              font-light
              text-text
              dark:text-text-dark/70
            "
          >
            {text}
          </p>
        </div>

        {/* Category + Read More Button */}
        <div
          className="
            mt-auto
            flex
            
            justify-between
            gap-3
            pt-4
          "
        >
          {/* Read More Button */}
          {ButtonContent}

          {/* Category */}
          {category && (
            <div
              className="
                min-w-0
                truncate
                rounded-lg
                bg-brand-primary/10
                px-2
                py-1
                text-sm
                text-brand-primary
                flex justify-center items-center
              "
            >
              {category}
            </div>
          )}
        </div>
      </div>
    </article>
  );

  if (!href) return Card;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {Card}
      </a>
    );
  }

  return <Link href={href}>{Card}</Link>;
}
