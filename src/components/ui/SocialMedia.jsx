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
              hidden lg:flex justify-between items-center gap-4 h-full

              rounded-full
              border border-black/5 dark:border-white/10

              bg-gray-200/60
              dark:bg-black/30

              backdrop-blur-sm

              px-2
              xsm:px-4
              py-2
              md:py-4
            "
    >
      <FaFacebookF />
      <FaInstagram />
      <FaLinkedinIn />
      <FaWhatsapp />
    </div>
  );
}
