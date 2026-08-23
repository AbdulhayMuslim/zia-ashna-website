import Header3 from "@/components/layout/Header3";
import Footer from "@/components/layout/Footer";
import { getWebsiteChrome } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function WebsiteLayout({ children }) {
  const { settings, socialLinks } = await getWebsiteChrome();
  return (
    <>
      <Header3 settings={settings} socialLinks={socialLinks} />

      <main className="flex-1">{children}</main>

      <Footer settings={settings} socialLinks={socialLinks} />
    </>
  );
}
