import Image from "next/image";

export default function PostCard({ image, date, category, title, text, btn }) {
  return (
    <div className="group overflow-hidden rounded-2xl flex flex-col bg-bg dark:bg-bg-dark max-w-100 border-2 border-brand-primary/20">
      {/* Image */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
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

        <div className="font-semibold text-md text-brand-primary">{title}</div>
        <div className="font-light text-md text-text dark:text-text-dark/80">
          {text}
        </div>
        <div className="bg-brand-primary/10 py-2 px-4 rounded-lg w-fit text-brand-primary font-medium">
          {btn}
        </div>
      </div>
    </div>
  );
}
