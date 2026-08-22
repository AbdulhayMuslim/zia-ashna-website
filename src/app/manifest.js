import { getSiteSettings } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function manifest() {
  const settings = await getSiteSettings();
  const name = settings?.siteName || "Sayed Zia Ashna";
  return {
    name,
    short_name: name,
    description: settings?.siteDescription || "Official portfolio and publications.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9f4d16",
    icons: settings?.faviconUrl ? [{ src: settings.faviconUrl, sizes: "any", type: "image/png" }] : undefined,
  };
}
