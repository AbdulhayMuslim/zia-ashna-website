import Header3 from "@/components/layout/Header3";
import Footer from "@/components/layout/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header3 />

      <main className="flex-1">{children}</main>

      <Footer />
    </>
  );
}
