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
        inline-flex items-center gap-2
        bg-brand-primary/10
        py-2 px-4
        rounded-lg
        w-fit
        text-brand-primary
        font-medium
        duration-300
        hover:bg-brand-primary
        hover:text-bg
      "
    >
      <span className="text-sm">{btn}</span>

      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </div>
  );

  const Card = (
    <article
      className="
        h-full
        group
        overflow-hidden
        rounded-2xl
        flex
        flex-col
        bg-bg
        dark:bg-bg-dark
        w-full
        border-2
        border-brand-primary/30 dark:border-brand-primary/20
        transition-all duration-300 hover:-translate-y-1
      "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title || "Blog post"}
          sizes="(max-width:768px)100vw,(max-width:1024px)50vw,400px"
          className="w-full h-60 object-cover duration-400 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Top Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-brand-primary/10 px-2 py-1 text-sm text-brand-primary">
              {category}
            </div>

            <div className="text-sm text-brand-primary">{date}</div>
          </div>

          <h3 className="line-clamp-2 text-xl font-semibold text-heading-soft duration-300 group-hover:text-brand-primary dark:text-heading-dark/80">
            {title}
          </h3>

          <p className="line-clamp-3 text-md font-light text-text dark:text-text-dark/70">
            {text}
          </p>
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">{ButtonContent}</div>
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
