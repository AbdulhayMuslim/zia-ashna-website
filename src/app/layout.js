import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
