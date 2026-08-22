import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { getSiteSettings } from "@/lib/public-data";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || "Sayed Zia Ashna";
  const title = settings?.seoTitle || siteName;
  const description = settings?.seoDescription || settings?.siteDescription || "Official portfolio and publications.";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    applicationName: siteName,
    icons: settings?.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: { type: "website", siteName, title, description, images: settings?.logoUrl ? [{ url: settings.logoUrl, alt: siteName }] : [{ url: "/images/herobg.png", alt: siteName }] },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
