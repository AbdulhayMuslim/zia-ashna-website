import { SOCIAL_ICONS } from "@/lib/social-icons";

export default function SocialMedia({ links = [], placement = "header" }) {
  const inFooter = placement === "footer";
  if (!links.length) return null;
  return (
    <div className={inFooter ? "flex items-center justify-center gap-2 md:justify-end" : "hidden items-center justify-between gap-4 rounded-full border border-black/5 bg-gray-200/60 px-4 py-4 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:shadow-black/20 lg:flex"}>
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon] || SOCIAL_ICONS.Globe;
        const isExternal = link.url && link.url !== "#";
        return (
        <a
          key={link.id ?? `${link.label}-${link.sortOrder}`}
          href={link.url || "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={link.label}
          title={link.label}
          className={inFooter ? "group flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition hover:bg-brand-primary hover:text-white dark:text-brand-secondary" : undefined}
        >
          <Icon className={inFooter ? "duration-300 group-hover:scale-110 group-hover:text-white" : "duration-300 hover:scale-120 hover:text-brand-primary"} />
        </a>
      );})}
    </div>
  );
}
