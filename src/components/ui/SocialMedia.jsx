import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function SocialMedia() {
  return (
    <div
      className="
        hidden lg:flex justify-between items-center gap-4
        rounded-full
        border border-black/5 dark:border-white/10
        bg-gray-200/60 shadow-lg shadow-black/5
        dark:bg-black/30 dark:shadow-black/20
        backdrop-blur-md
        px-2 xsm:px-4
        py-2 md:py-4
      "
    >
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebookF className="hover:text-brand-primary hover:scale-120 duration-300" />
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram className="hover:text-brand-primary hover:scale-120 duration-300" />
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn className="hover:text-brand-primary hover:scale-120 duration-300" />
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="hover:text-brand-primary hover:scale-120 duration-300" />
      </a>
    </div>
  );
}
