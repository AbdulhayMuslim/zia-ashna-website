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
    <article className="h-full group overflow-hidden rounded-2xl flex flex-col bg-bg dark:bg-bg-dark max-w-100 border-2 border-brand-primary/20">
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
      <div className="p-4 flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          <div className="py-1 px-2 bg-brand-primary/10 rounded-lg text-brand-primary text-sm">
            {category}
          </div>

          <div className="text-brand-primary text-sm">{date}</div>
        </div>

        <h3 className="font-semibold text-md duration-300 text-heading-soft group-hover:text-brand-primary">
          {title}
        </h3>

        <p className="font-light text-md text-text dark:text-text-dark/80">
          {text}
        </p>

        {ButtonContent}
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
