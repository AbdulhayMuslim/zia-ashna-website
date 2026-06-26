import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark mt-14 md:mt-15 lg:mt-18">
        <ThemeProvider>
          <Header />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
