import Header3 from "@/components/layout/Header3";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function WebsiteLayout({ children }) {
  const settings = await getSiteSettings();
  return (
    <>
      <Header3 settings={settings} />

      <main className="flex-1">{children}</main>

      <Footer settings={settings} />
    </>
  );
}
