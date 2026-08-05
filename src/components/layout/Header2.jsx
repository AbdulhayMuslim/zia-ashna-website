import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navigationLinks } from "@/data/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Header() {
  return (
    <header
      className="w-full fixed z-50 top-0 flex items-center justify-center
      backdrop-blur-xs
    "
    >
      <div
        className="
            m-4 flex items-center justify-around w-[90%] sm:w-[80%] lg:w-[70%]
            h-12 sm:h-14 lg:h-16
             overflow-hidden
          "
      >
        {navigationLinks.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="
              text-brand-primary dark:text-brand-secondary
              w-full h-full flex items-center justify-around hover:bg-brand-primary/10 dark:hover:bg-gray-800
              rounded-full duration-400 outline-none
                "
            >
              <Icon className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:-w-8" />
            </a>
          );
        })}

        <div className="h-full w-full flex items-center justify-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Social Links */}
      <div className="hidden md:flex items-center gap-6 pr-4 text-xl text-gray-400">
        <a href="#" target="_blank" rel="noreferrer">
          <FaFacebook className="hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-115 duration-300" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaInstagram className="hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-115 duration-300" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaLinkedin className="hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-115 duration-300" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaXTwitter className="hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-115 duration-300" />
        </a>
      </div>
    </header>
  );
}
