"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there is history to go back to
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleClick = () => {
    if (canGoBack) {
      router.back();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-20 left-4 z-50 rounded-full bg-black text-white px-4 py-2 shadow-lg hover:bg-gray-800 transition"
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}
