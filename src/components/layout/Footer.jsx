import Container from "../ui/Container";

export default function Footer({ settings }) {
  const copyright = (settings?.copyright || "Copyright © {year} Sayed Zia Ashna. All rights reserved.").replace("{year}", new Date().getFullYear());
  return (
    <footer className="bg-brand-primary/20 py-4">
      <Container className="flex flex-col gap-4 md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-start text-gray-700 dark:text-gray-300">
          {copyright}
        </p>
      </Container>
    </footer>
  );
}
