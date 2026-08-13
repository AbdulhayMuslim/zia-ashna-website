import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Sayed Zia Ashna",
    template: "%s | Sayed Zia Ashna",
  },
  description:
    "The official portfolio and publications of entrepreneur and technology leader Sayed Zia Ashna.",
  applicationName: "Sayed Zia Ashna",
  openGraph: {
    type: "website",
    siteName: "Sayed Zia Ashna",
    title: "Sayed Zia Ashna",
    description:
      "Portfolio, professional journey, activities, and publications.",
    images: [{ url: "/images/herobg.png", alt: "Sayed Zia Ashna" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
