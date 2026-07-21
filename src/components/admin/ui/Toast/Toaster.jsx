"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

export default function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme}
      position="top-right"
      richColors
      closeButton
      expand
      visibleToasts={5}
      duration={4000}
      toastOptions={{
        style: {
          borderRadius: "12px",
        },
      }}
    />
  );
}
