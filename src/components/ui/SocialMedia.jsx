import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";

const networks = [
  ["facebook", "Facebook", FaFacebookF],
  ["instagram", "Instagram", FaInstagram],
  ["linkedin", "LinkedIn", FaLinkedinIn],
  ["twitter", "X", FaXTwitter],
  ["youtube", "YouTube", FaYoutube],
  ["whatsapp", "WhatsApp", FaWhatsapp],
];

export default function SocialMedia({ settings }) {
  const links = networks.filter(([key]) => settings?.[key]);
  if (!links.length) return null;
  return (
    <div className="hidden items-center justify-between gap-4 rounded-full border border-black/5 bg-gray-200/60 px-4 py-4 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:shadow-black/20 lg:flex">
      {links.map(([key, label, Icon]) => (
        <a key={key} href={settings[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon className="duration-300 hover:scale-120 hover:text-brand-primary" />
        </a>
      ))}
    </div>
  );
}
