"use client";

import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      theme="system"
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
