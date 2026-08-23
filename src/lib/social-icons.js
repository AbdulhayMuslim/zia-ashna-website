import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Globe } from "lucide-react";

export const SOCIAL_ICONS = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  YouTube: FaYoutube,
  WhatsApp: FaWhatsapp,
  TikTok: FaTiktok,
  Telegram: FaTelegram,
  Pinterest: FaPinterestP,
  Snapchat: FaSnapchat,
  Discord: FaDiscord,
  GitHub: FaGithub,
  Globe,
};

export const SOCIAL_ICON_LIST = Object.entries(SOCIAL_ICONS).map(([name, Icon]) => ({ name, Icon }));
