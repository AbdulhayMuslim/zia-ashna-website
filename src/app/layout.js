import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header3 from "@/components/layout/Header3";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
        <ThemeProvider>
          <Header3 />

          <main className="flex-1">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
