import Container from "../ui/Container";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-brand-primary/20 py-4">
      <Container className="flex flex-col gap-4 md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-start text-gray-700 dark:text-gray-300">
          Copyright © {new Date().getFullYear()} Sayed Zia Ashna. All rights
          reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6 pr-4 text-xl text-gray-600 dark:text-gray-300">
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
      </Container>
    </footer>
  );
}
